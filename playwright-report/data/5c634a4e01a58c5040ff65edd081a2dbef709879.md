# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: rockets.spec.ts >> Rockets API >> POST /rockets - missing name returns 400 with error message
- Location: tests\rockets.spec.ts:139:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 404
```

# Test source

```ts
  45  |     expect(body.name).toBe("Star Cruiser");
  46  |   });
  47  | 
  48  |   test("GET /rockets/:id - returns 404 for non-existing rocket", async ({
  49  |     request,
  50  |   }) => {
  51  |     const res = await request.get(`${BASE}/non-existing-id`);
  52  |     expect(res.status()).toBe(404);
  53  |   });
  54  | 
  55  |   // AC5: PUT /rockets/:id updates and returns 200
  56  |   test("PUT /rockets/:id - updates rocket and returns 200", async ({
  57  |     request,
  58  |   }) => {
  59  |     const createRes = await request.post(BASE, {
  60  |       data: { name: "Atlas V", range: "suborbital", capacity: 2 },
  61  |     });
  62  |     const { id } = await createRes.json();
  63  | 
  64  |     const res = await request.put(`${BASE}/${id}`, {
  65  |       data: { capacity: 8 },
  66  |     });
  67  |     expect(res.status()).toBe(200);
  68  |     const body = await res.json();
  69  |     expect(body.capacity).toBe(8);
  70  |     expect(body.name).toBe("Atlas V");
  71  |   });
  72  | 
  73  |   // AC6: DELETE /rockets/:id removes and returns 204
  74  |   test("DELETE /rockets/:id - removes rocket and returns 204", async ({
  75  |     request,
  76  |   }) => {
  77  |     const createRes = await request.post(BASE, {
  78  |       data: { name: "Disposable Rocket", range: "mars", capacity: 1 },
  79  |     });
  80  |     const { id } = await createRes.json();
  81  | 
  82  |     const deleteRes = await request.delete(`${BASE}/${id}`);
  83  |     expect(deleteRes.status()).toBe(204);
  84  | 
  85  |     const getRes = await request.get(`${BASE}/${id}`);
  86  |     expect(getRes.status()).toBe(404);
  87  |   });
  88  | 
  89  |   // AC7: Invalid range returns 400
  90  |   test("POST /rockets - invalid range returns 400 with error message", async ({
  91  |     request,
  92  |   }) => {
  93  |     const res = await request.post(BASE, {
  94  |       data: { name: "Bad Range Rocket", range: "pluto", capacity: 5 },
  95  |     });
  96  |     expect(res.status()).toBe(400);
  97  |     const body = await res.json();
  98  |     expect(body.error).toBeTruthy();
  99  |   });
  100 | 
  101 |   test("PUT /rockets/:id - invalid range returns 400", async ({ request }) => {
  102 |     const createRes = await request.post(BASE, {
  103 |       data: { name: "Range Test", range: "orbital", capacity: 3 },
  104 |     });
  105 |     const { id } = await createRes.json();
  106 | 
  107 |     const res = await request.put(`${BASE}/${id}`, {
  108 |       data: { range: "jupiter" },
  109 |     });
  110 |     expect(res.status()).toBe(400);
  111 |     const body = await res.json();
  112 |     expect(body.error).toBeTruthy();
  113 |   });
  114 | 
  115 |   // AC8: Invalid capacity returns 400
  116 |   test("POST /rockets - capacity below minimum returns 400", async ({
  117 |     request,
  118 |   }) => {
  119 |     const res = await request.post(BASE, {
  120 |       data: { name: "Empty Rocket", range: "orbital", capacity: 0 },
  121 |     });
  122 |     expect(res.status()).toBe(400);
  123 |     const body = await res.json();
  124 |     expect(body.error).toBeTruthy();
  125 |   });
  126 | 
  127 |   test("POST /rockets - capacity above maximum returns 400", async ({
  128 |     request,
  129 |   }) => {
  130 |     const res = await request.post(BASE, {
  131 |       data: { name: "Giant Rocket", range: "orbital", capacity: 11 },
  132 |     });
  133 |     expect(res.status()).toBe(400);
  134 |     const body = await res.json();
  135 |     expect(body.error).toBeTruthy();
  136 |   });
  137 | 
  138 |   // AC9: Missing name returns 400
  139 |   test("POST /rockets - missing name returns 400 with error message", async ({
  140 |     request,
  141 |   }) => {
  142 |     const res = await request.post(BASE, {
  143 |       data: { range: "orbital", capacity: 5 },
  144 |     });
> 145 |     expect(res.status()).toBe(400);
      |                          ^ Error: expect(received).toBe(expected) // Object.is equality
  146 |     const body = await res.json();
  147 |     expect(body.error).toBeTruthy();
  148 |   });
  149 | 
  150 |   test("PUT /rockets/:id - empty name returns 400", async ({ request }) => {
  151 |     const createRes = await request.post(BASE, {
  152 |       data: { name: "Name Test", range: "orbital", capacity: 3 },
  153 |     });
  154 |     const { id } = await createRes.json();
  155 | 
  156 |     const res = await request.put(`${BASE}/${id}`, {
  157 |       data: { name: "" },
  158 |     });
  159 |     expect(res.status()).toBe(400);
  160 |     const body = await res.json();
  161 |     expect(body.error).toBeTruthy();
  162 |   });
  163 | });
  164 | 
```