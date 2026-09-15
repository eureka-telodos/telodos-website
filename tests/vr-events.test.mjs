import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchVrEvents } from '../src/lib/vr-events-client.ts';
const entry = {
  'event-name': ' Example ', 'event-banner': {url:'https://images.microcms-assets.io/banner.png',width:1200,height:600},
  'event-link': ' https://example.com/\n',
};
const respond = data => async () => Response.json(data);
test('maps schema, trims links, accepts optional description, keeps intrinsic ratio', async () => {
  const [result] = await fetchVrEvents('etdnews','events','test',respond({contents:[entry],totalCount:1}));
  assert.deepEqual(result,{name:'Example',description:'',href:'https://example.com/',logo:entry['event-banner'].url,width:1200,height:600});
});
test('fetches subsequent pages and sends key only in header', async () => {
  const offsets=[];
  const result=await fetchVrEvents('etdnews','events','test',async (url,options) => {
    offsets.push(url.searchParams.get('offset'));
    assert.equal(url.searchParams.has('apiKey'),false);
    assert.equal(options.headers['X-MICROCMS-API-KEY'],'test');
    return Response.json({contents:[entry],totalCount:2});
  });
  assert.equal(result.length,2); assert.deepEqual(offsets,['0','1']);
});
test('empty published list stays empty', async () => {
  assert.deepEqual(await fetchVrEvents('etdnews','events','test',respond({contents:[],totalCount:0})),[]);
});
test('HTTP errors and truncated responses reject', async () => {
  await assert.rejects(fetchVrEvents('etdnews','events','test',async()=>new Response('',{status:403})),/403/);
  await assert.rejects(fetchVrEvents('etdnews','events','test',respond({contents:[],totalCount:1})),/Incomplete/);
});
test('rejects unsafe links and invalid dimensions', async () => {
  for(const changed of [
    {...entry,'event-link':'javascript:alert(1)'},
    {...entry,'event-banner':{...entry['event-banner'],width:0}},
  ]) await assert.rejects(fetchVrEvents('etdnews','events','test',respond({contents:[changed],totalCount:1})));
});
