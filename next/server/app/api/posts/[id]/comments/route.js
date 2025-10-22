"use strict";(()=>{var e={};e.id=3405,e.ids=[3405],e.modules={2885:e=>{e.exports=require("@supabase/supabase-js")},2934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},5316:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>g,patchFetch:()=>f,requestAsyncStorage:()=>l,routeModule:()=>d,serverHooks:()=>x,staticGenerationAsyncStorage:()=>m});var s={};r.r(s),r.d(s,{GET:()=>p,POST:()=>u});var n=r(9303),a=r(8716),o=r(670),i=r(9692),c=r(7070);async function p(e,{params:t}){let{id:r}=await t,s=await (0,i.e)(),{searchParams:n}=new URL(e.url),a=Number.parseInt(n.get("page")||"1"),o=Number.parseInt(n.get("limit")||"10"),p=(a-1)*o;try{let{data:e,error:t}=await s.from("comments").select(`
        id,
        content,
        like_count,
        reply_count,
        created_at,
        profiles:user_id (
          username,
          display_name,
          avatar_url,
          is_verified
        )
      `).eq("post_id",r).is("parent_id",null).order("created_at",{ascending:!1}).range(p,p+o-1);if(t)throw t;return c.NextResponse.json({comments:e||[]})}catch(e){return console.error("Error fetching comments:",e),c.NextResponse.json({error:"Failed to fetch comments"},{status:500})}}async function u(e,{params:t}){let{id:r}=await t,s=await (0,i.e)();try{let{data:{user:t},error:n}=await s.auth.getUser();if(n||!t)return c.NextResponse.json({error:"Unauthorized"},{status:401});let{content:a,parent_id:o}=await e.json();if(!a?.trim())return c.NextResponse.json({error:"Content is required"},{status:400});let{data:i,error:p}=await s.from("comments").insert({content:a.trim(),post_id:r,user_id:t.id,parent_id:o||null}).select(`
        id,
        content,
        like_count,
        reply_count,
        created_at,
        profiles:user_id (
          username,
          display_name,
          avatar_url,
          is_verified
        )
      `).single();if(p)throw p;return c.NextResponse.json({comment:i},{status:201})}catch(e){return console.error("Error creating comment:",e),c.NextResponse.json({error:"Failed to create comment"},{status:500})}}let d=new n.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/posts/[id]/comments/route",pathname:"/api/posts/[id]/comments",filename:"route",bundlePath:"app/api/posts/[id]/comments/route"},resolvedPagePath:"C:\\Users\\User-PC\\Desktop\\edna-lifestyle\\app\\api\\posts\\[id]\\comments\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:l,staticGenerationAsyncStorage:m,serverHooks:x}=d,g="/api/posts/[id]/comments/route";function f(){return(0,o.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:m})}},9692:(e,t,r)=>{r.d(t,{e:()=>a});var s=r(7721),n=r(1615);async function a(){let e=await (0,n.cookies)();return(0,s.createServerClient)("https://tdqbdkwokdsudijppjcy.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkcWJka3dva2RzdWRpanBwamN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MTk3NTEsImV4cCI6MjA3MjM5NTc1MX0.ZyW2ggeup_A45cenGjVPFebfVMKwrE6c9NP7xgWLUrU",{cookies:{getAll:()=>e.getAll(),setAll(t){try{t.forEach(({name:t,value:r,options:s})=>e.set(t,r,s))}catch{}}}})}}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[9276,9702,5972],()=>r(5316));module.exports=s})();