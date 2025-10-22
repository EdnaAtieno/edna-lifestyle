-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- Add updated_at triggers
create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger posts_updated_at before update on public.posts
  for each row execute function public.handle_updated_at();

create trigger comments_updated_at before update on public.comments
  for each row execute function public.handle_updated_at();

create trigger categories_updated_at before update on public.categories
  for each row execute function public.handle_updated_at();

-- Function to update post counts
create or replace function public.update_post_counts()
returns trigger
language plpgsql
as $$
begin
  if TG_OP = 'INSERT' then
    -- Update author post count
    update public.profiles 
    set post_count = post_count + 1 
    where id = new.author_id;
    
    -- Update category post count
    if new.category_id is not null then
      update public.categories 
      set post_count = post_count + 1 
      where id = new.category_id;
    end if;
    
    return new;
  elsif TG_OP = 'DELETE' then
    -- Update author post count
    update public.profiles 
    set post_count = post_count - 1 
    where id = old.author_id;
    
    -- Update category post count
    if old.category_id is not null then
      update public.categories 
      set post_count = post_count - 1 
      where id = old.category_id;
    end if;
    
    return old;
  end if;
  return null;
end;
$$;

-- Trigger for post counts
create trigger posts_count_trigger
  after insert or delete on public.posts
  for each row execute function public.update_post_counts();

-- Function to update follow counts
create or replace function public.update_follow_counts()
returns trigger
language plpgsql
as $$
begin
  if TG_OP = 'INSERT' then
    -- Update follower count
    update public.profiles 
    set follower_count = follower_count + 1 
    where id = new.following_id;
    
    -- Update following count
    update public.profiles 
    set following_count = following_count + 1 
    where id = new.follower_id;
    
    return new;
  elsif TG_OP = 'DELETE' then
    -- Update follower count
    update public.profiles 
    set follower_count = follower_count - 1 
    where id = old.following_id;
    
    -- Update following count
    update public.profiles 
    set following_count = following_count - 1 
    where id = old.follower_id;
    
    return old;
  end if;
  return null;
end;
$$;

-- Trigger for follow counts
create trigger follows_count_trigger
  after insert or delete on public.follows
  for each row execute function public.update_follow_counts();

-- Function to update like counts
create or replace function public.update_like_counts()
returns trigger
language plpgsql
as $$
begin
  if TG_OP = 'INSERT' then
    if new.post_id is not null then
      update public.posts 
      set like_count = like_count + 1 
      where id = new.post_id;
    elsif new.comment_id is not null then
      update public.comments 
      set like_count = like_count + 1 
      where id = new.comment_id;
    end if;
    return new;
  elsif TG_OP = 'DELETE' then
    if old.post_id is not null then
      update public.posts 
      set like_count = like_count - 1 
      where id = old.post_id;
    elsif old.comment_id is not null then
      update public.comments 
      set like_count = like_count - 1 
      where id = old.comment_id;
    end if;
    return old;
  end if;
  return null;
end;
$$;

-- Trigger for like counts
create trigger likes_count_trigger
  after insert or delete on public.likes
  for each row execute function public.update_like_counts();

-- Function to update comment counts
create or replace function public.update_comment_counts()
returns trigger
language plpgsql
as $$
begin
  if TG_OP = 'INSERT' then
    if new.parent_id is null then
      -- Top-level comment
      update public.posts 
      set comment_count = comment_count + 1 
      where id = new.post_id;
    else
      -- Reply to comment
      update public.comments 
      set reply_count = reply_count + 1 
      where id = new.parent_id;
    end if;
    return new;
  elsif TG_OP = 'DELETE' then
    if old.parent_id is null then
      -- Top-level comment
      update public.posts 
      set comment_count = comment_count - 1 
      where id = old.post_id;
    else
      -- Reply to comment
      update public.comments 
      set reply_count = reply_count - 1 
      where id = old.parent_id;
    end if;
    return old;
  end if;
  return null;
end;
$$;

-- Trigger for comment counts
create trigger comments_count_trigger
  after insert or delete on public.comments
  for each row execute function public.update_comment_counts();
