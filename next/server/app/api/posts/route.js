"use strict";(()=>{var e={};e.id=990,e.ids=[990],e.modules={2885:e=>{e.exports=require("@supabase/supabase-js")},2934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6297:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>f,patchFetch:()=>h,requestAsyncStorage:()=>d,routeModule:()=>l,serverHooks:()=>m,staticGenerationAsyncStorage:()=>g});var a={};r.r(a),r.d(a,{GET:()=>p,POST:()=>u});var s=r(9303),o=r(8716),i=r(670),n=r(9692),c=r(7070);async function p(e){let t=await (0,n.e)(),{searchParams:r}=new URL(e.url),a=Number.parseInt(r.get("page")||"1"),s=Number.parseInt(r.get("limit")||"12"),o=r.get("category"),i=r.get("tag"),p=r.get("author"),u=r.get("search"),l=(a-1)*s;try{let e=t.from("posts").select(`
        id,
        content,
        image_url,
        like_count,
        comment_count,
        view_count,
        created_at,
        profiles:author_id (
          username,
          display_name,
          avatar_url,
          is_verified
        ),
        categories (
          name,
          color,
          slug
        )
      `);o&&(e=e.eq("category_id",o)),p&&(e=e.eq("profiles.username",p)),u&&(e=e.textSearch("content",u)),i&&(e=e.select(`
          id,
          content,
          image_url,
          like_count,
          comment_count,
          view_count,
          created_at,
          profiles:author_id (
            username,
            display_name,
            avatar_url,
            is_verified
          ),
          categories (
            name,
            color,
            slug
          ),
          post_tags!inner (
            tags!inner (
              slug
            )
          )
        `).eq("post_tags.tags.slug",i));let{data:r,error:n}=await e.order("created_at",{ascending:!1}).range(l,l+s-1);if(n)throw n;let d=t.from("posts").select("*",{count:"exact",head:!0});o&&(d=d.eq("category_id",o));let{count:g}=await d;return c.NextResponse.json({posts:r||[],pagination:{page:a,limit:s,total:g||0,totalPages:Math.ceil((g||0)/s)}})}catch(e){return console.error("Error fetching posts:",e),c.NextResponse.json({error:"Failed to fetch posts"},{status:500})}}async function u(e){let t=await (0,n.e)();try{let{data:{user:r},error:a}=await t.auth.getUser();if(a||!r)return c.NextResponse.json({error:"Unauthorized"},{status:401});let{content:s,image_url:o,category_id:i,tags:n}=await e.json(),{data:p,error:u}=await t.from("posts").insert({content:s,image_url:o,category_id:i||null,author_id:r.id}).select().single();if(u)throw u;if(n&&Array.isArray(n))for(let e of n){let{data:r}=await t.from("tags").select("id").eq("name",e.toLowerCase()).single(),a=r?.id;if(!a){let{data:r,error:s}=await t.from("tags").insert({name:e.toLowerCase(),slug:e.toLowerCase().replace(/\s+/g,"-")}).select("id").single();if(s)throw s;a=r.id}await t.from("post_tags").insert({post_id:p.id,tag_id:a})}return c.NextResponse.json({post:p},{status:201})}catch(e){return console.error("Error creating post:",e),c.NextResponse.json({error:"Failed to create post"},{status:500})}}let l=new s.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/posts/route",pathname:"/api/posts",filename:"route",bundlePath:"app/api/posts/route"},resolvedPagePath:"C:\\Users\\User-PC\\Desktop\\edna-lifestyle\\app\\api\\posts\\route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:d,staticGenerationAsyncStorage:g,serverHooks:m}=l,f="/api/posts/route";function h(){return(0,i.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:g})}},9692:(e,t,r)=>{r.d(t,{e:()=>o});var a=r(7721),s=r(1615);async function o(){let e=await (0,s.cookies)();return(0,a.createServerClient)("https://tdqbdkwokdsudijppjcy.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkcWJka3dva2RzdWRpanBwamN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MTk3NTEsImV4cCI6MjA3MjM5NTc1MX0.ZyW2ggeup_A45cenGjVPFebfVMKwrE6c9NP7xgWLUrU",{cookies:{getAll:()=>e.getAll(),setAll(t){try{t.forEach(({name:t,value:r,options:a})=>e.set(t,r,a))}catch{}}}})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[9276,9702,5972],()=>r(6297));module.exports=a})();