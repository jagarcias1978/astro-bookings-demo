import { test, expect } from "@playwright/test";

const BASE = "/rockets";

test.describe("Rockets API", () => {
  let createdId: string;

  // AC1: POST creates a rocket and returns 201 with unique ID
  test("POST /rockets - creates a rocket and returns 201 with unique ID", async ({
    request,
  }) => {
    const res = await request.post(BASE, {
      data: { name: "Falcon 9", range: "orbital", capacity: 5 },
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.id).toBeTruthy();
    expect(body.name).toBe("Falcon 9");
    expect(body.range).toBe("orbital");
    expect(body.capacity).toBe(5);
    createdId = body.id;
  });

  // AC2: GET /rockets returns list with 200
  test("GET /rockets - returns list with 200", async ({ request }) => {
    const res = await request.get(BASE);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

  // AC3 & AC4: GET /rockets/:id for existing and non-existing rockets
  test("GET /rockets/:id - returns rocket for existing ID with 200", async ({
    request,
  }) => {
    const createRes = await request.post(BASE, {
      data: { name: "Star Cruiser", range: "moon", capacity: 3 },
    });
    const { id } = await createRes.json();

    const res = await request.get(`${BASE}/${id}`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(id);
    expect(body.name).toBe("Star Cruiser");
  });

  test("GET /rockets/:id - returns 404 for non-existing rocket", async ({
    request,
  }) => {
    const res = await request.get(`${BASE}/non-existing-id`);
    expect(res.status()).toBe(404);
  });

  // AC5: PUT /rockets/:id updates and returns 200
  test("PUT /rockets/:id - updates rocket and returns 200", async ({
    request,
  }) => {
    const createRes = await request.post(BASE, {
      data: { name: "Atlas V", range: "suborbital", capacity: 2 },
    });
    const { id } = await createRes.json();

    const res = await request.put(`${BASE}/${id}`, {
      data: { capacity: 8 },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.capacity).toBe(8);
    expect(body.name).toBe("Atlas V");
  });

  // AC6: DELETE /rockets/:id removes and returns 204
  test("DELETE /rockets/:id - removes rocket and returns 204", async ({
    request,
  }) => {
    const createRes = await request.post(BASE, {
      data: { name: "Disposable Rocket", range: "mars", capacity: 1 },
    });
    const { id } = await createRes.json();

    const deleteRes = await request.delete(`${BASE}/${id}`);
    expect(deleteRes.status()).toBe(204);

    const getRes = await request.get(`${BASE}/${id}`);
    expect(getRes.status()).toBe(404);
  });

  // AC7: Invalid range returns 400
  test("POST /rockets - invalid range returns 400 with error message", async ({
    request,
  }) => {
    const res = await request.post(BASE, {
      data: { name: "Bad Range Rocket", range: "pluto", capacity: 5 },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  test("PUT /rockets/:id - invalid range returns 400", async ({ request }) => {
    const createRes = await request.post(BASE, {
      data: { name: "Range Test", range: "orbital", capacity: 3 },
    });
    const { id } = await createRes.json();

    const res = await request.put(`${BASE}/${id}`, {
      data: { range: "jupiter" },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  // AC8: Invalid capacity returns 400
  test("POST /rockets - capacity below minimum returns 400", async ({
    request,
  }) => {
    const res = await request.post(BASE, {
      data: { name: "Empty Rocket", range: "orbital", capacity: 0 },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  test("POST /rockets - capacity above maximum returns 400", async ({
    request,
  }) => {
    const res = await request.post(BASE, {
      data: { name: "Giant Rocket", range: "orbital", capacity: 11 },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  // AC9: Missing name returns 400
  test("POST /rockets - missing name returns 400 with error message", async ({
    request,
  }) => {
    const res = await request.post(BASE, {
      data: { range: "orbital", capacity: 5 },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  test("PUT /rockets/:id - empty name returns 400", async ({ request }) => {
    const createRes = await request.post(BASE, {
      data: { name: "Name Test", range: "orbital", capacity: 3 },
    });
    const { id } = await createRes.json();

    const res = await request.put(`${BASE}/${id}`, {
      data: { name: "" },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });
});
