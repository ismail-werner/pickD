/* PickD offline cache. Bump VERSION whenever you change a file so phones pick up the new copy. */
const VERSION="pickd-1";
const FILES=["./", "index.html", "manifest.webmanifest", "fonts/plus-jakarta-sans-latin-500-normal.woff2", "fonts/plus-jakarta-sans-latin-700-normal.woff2", "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "seed/av-test.bakery.jpg", "seed/av-test.coffee.jpg", "seed/av-test.cycles.jpg", "seed/av-test.flowers.jpg", "seed/av-test.maker.jpg", "seed/av-test.photo.jpg", "seed/av-test.roads.jpg", "seed/av-test.robotics.jpg", "seed/av-test.space.jpg", "seed/m108358720.jpg", "seed/m11317510.jpg", "seed/m113462760.jpg", "seed/m117663639.jpg", "seed/m130857602.jpg", "seed/m138226685.jpg", "seed/m138226686.jpg", "seed/m138547195.jpg", "seed/m147143898.jpg", "seed/m155271467.jpg", "seed/m162973523.jpg", "seed/m164989354.jpg", "seed/m175976897.jpg", "seed/m183016636.jpg", "seed/m187311853.jpg", "seed/m19113729.jpg", "seed/m21913761.jpg", "seed/m33603672.jpg", "seed/m37164269.jpg", "seed/m40088587.jpg", "seed/m41582884.jpg", "seed/m44931831.jpg", "seed/m94781083.jpg", "seed/seed.json", "seed/vid-bikes.mp4", "seed/vid-bread.mp4", "seed/vid-espresso.mp4", "seed/vid-fjord.mp4", "seed/vid-forge.mp4", "seed/vid-roast.mp4"];
self.addEventListener("install",e=>e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=="GET"||u.origin!==location.origin)return;
  const range=r.headers.get("range");
  if(range){ /* Safari asks for videos in byte ranges: answer from the cache with a 206 */
    e.respondWith(caches.match(u.href,{ignoreSearch:true}).then(async hit=>{
      if(!hit)return fetch(r);
      const b=await hit.blob(),m=/bytes=(\d*)-(\d*)/.exec(range)||[],start=+(m[1]||0),end=m[2]?Math.min(+m[2],b.size-1):b.size-1;
      return new Response(b.slice(start,end+1),{status:206,headers:{"Content-Type":hit.headers.get("Content-Type")||"video/mp4","Content-Range":`bytes ${start}-${end}/${b.size}`,"Content-Length":String(end-start+1),"Accept-Ranges":"bytes"}});
    }));
    return;
  }
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{
    if(res.ok&&res.status===200&&res.type==="basic"){const cp=res.clone();caches.open(VERSION).then(c=>c.put(r,cp))}
    return res;
  }).catch(()=>r.mode==="navigate"?caches.match("index.html"):Response.error())));
});
