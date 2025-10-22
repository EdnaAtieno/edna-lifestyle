"use strict";(()=>{var e={};e.id=8856,e.ids=[8856],e.modules={2885:e=>{e.exports=require("@supabase/supabase-js")},2934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},1132:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>g,patchFetch:()=>x,requestAsyncStorage:()=>l,routeModule:()=>c,serverHooks:()=>m,staticGenerationAsyncStorage:()=>d});var s={};r.r(s),r.d(s,{GET:()=>p});var a=r(9303),n=r(8716),o=r(670),i=r(9692),u=r(7070);async function p(e,{params:t}){let{username:r}=await t,s=await (0,i.e)(),{searchParams:a}=new URL(e.url),n=Number.parseInt(a.get("page")||"1"),o=Number.parseInt(a.get("limit")||"12"),p=(n-1)*o;try{let{data:e}=await s.from("profiles").select("id").eq("username",r).single();if(!e)return u.NextResponse.json({error:"User not found"},{status:404});let{data:t,error:a}=await s.from("posts").select(`
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
      `).eq("author_id",e.id).order("created_at",{ascending:!1}).range(p,p+o-1);if(a)throw a;return u.NextResponse.json({posts:t||[]})}catch(e){return console.error("Error fetching user posts:",e),u.NextResponse.json({error:"Failed to fetch user posts"},{status:500})}}let c=new a.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/users/[username]/posts/route",pathname:"/api/users/[username]/posts",filename:"route",bundlePath:"app/api/users/[username]/posts/route"},resolvedPagePath:"C:\\Users\\User-PC\\Desktop\\edna-lifestyle\\app\\api\\users\\[username]\\posts\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:l,staticGenerationAsyncStorage:d,serverHooks:m}=c,g="/api/users/[username]/posts/route";function x(){return(0,o.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:d})}},9692:(e,t,r)=>{r.d(t,{e:()=>n});var s=r(7721),a=r(1615);async function n(){let e=await (0,a.cookies)();return(0,s.createServerClient)("https://tdqbdkwokdsudijppjcy.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkcWJka3dva2RzdWRpanBwamN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MTk3NTEsImV4cCI6MjA3MjM5NTc1MX0.ZyW2ggeup_A45cenGjVPFebfVMKwrE6c9NP7xgWLUrU",{cookies:{getAll:()=>e.getAll(),setAll(t){try{t.forEach(({name:t,value:r,options:s})=>e.set(t,r,s))}catch{}}}})}}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[9276,9702,5972],()=>r(1132));module.exports=s})();