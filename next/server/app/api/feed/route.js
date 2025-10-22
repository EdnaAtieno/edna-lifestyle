"use strict";(()=>{var e={};e.id=749,e.ids=[749],e.modules={2885:e=>{e.exports=require("@supabase/supabase-js")},2934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},7576:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>f,patchFetch:()=>g,requestAsyncStorage:()=>d,routeModule:()=>p,serverHooks:()=>m,staticGenerationAsyncStorage:()=>l});var a={};r.r(a),r.d(a,{GET:()=>u});var s=r(9303),o=r(8716),n=r(670),i=r(9692),c=r(7070);async function u(e){let t=await (0,i.e)(),{searchParams:r}=new URL(e.url),a=Number.parseInt(r.get("page")||"1"),s=Number.parseInt(r.get("limit")||"12"),o=(a-1)*s;try{let{data:{user:e},error:r}=await t.auth.getUser();if(r||!e)return c.NextResponse.json({error:"Unauthorized"},{status:401});let{data:a,error:n}=await t.from("posts").select(`
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
      `).in("author_id",t.from("follows").select("following_id").eq("follower_id",e.id)).order("created_at",{ascending:!1}).range(o,o+s-1);if(n)throw n;return c.NextResponse.json({posts:a||[]})}catch(e){return console.error("Error fetching feed:",e),c.NextResponse.json({error:"Failed to fetch feed"},{status:500})}}let p=new s.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/feed/route",pathname:"/api/feed",filename:"route",bundlePath:"app/api/feed/route"},resolvedPagePath:"C:\\Users\\User-PC\\Desktop\\edna-lifestyle\\app\\api\\feed\\route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:d,staticGenerationAsyncStorage:l,serverHooks:m}=p,f="/api/feed/route";function g(){return(0,n.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:l})}},9692:(e,t,r)=>{r.d(t,{e:()=>o});var a=r(7721),s=r(1615);async function o(){let e=await (0,s.cookies)();return(0,a.createServerClient)("https://tdqbdkwokdsudijppjcy.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkcWJka3dva2RzdWRpanBwamN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MTk3NTEsImV4cCI6MjA3MjM5NTc1MX0.ZyW2ggeup_A45cenGjVPFebfVMKwrE6c9NP7xgWLUrU",{cookies:{getAll:()=>e.getAll(),setAll(t){try{t.forEach(({name:t,value:r,options:a})=>e.set(t,r,a))}catch{}}}})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[9276,9702,5972],()=>r(7576));module.exports=a})();