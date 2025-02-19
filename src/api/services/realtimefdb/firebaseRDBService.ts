import {
  ref,
  get,
  set,
  update,
  remove,
  query,
  orderByChild,
  equalTo,
  push,
} from "firebase/database";
import { realtimeDb } from "../../connect";

export class RealtimeDbService<T> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async getAll(): Promise<(T & { documentId: string })[]> {
    const snapshot = await get(ref(realtimeDb, this.collectionName));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([id, value]) => ({
        documentId: id,
        ...(value as object),
      })) as (T & { documentId: string })[];
    }
    return [];
  }

  async get(id: string): Promise<(T & { documentId: string }) | null> {
    const snapshot = await get(ref(realtimeDb, `${this.collectionName}/${id}`));
    return snapshot.exists()
      ? { documentId: id, ...(snapshot.val() as T) }
      : null;
  }

  async find(
    field: string,
    value: any
  ): Promise<(T & { documentId: string })[]> {
    const q = query(
      ref(realtimeDb, this.collectionName),
      orderByChild(field),
      equalTo(value)
    );
    const snapshot = await get(q);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([id, value]) => ({
        documentId: id,
        ...(value as object),
      })) as (T & { documentId: string })[];
    }
    return [];
  }

  async findRoadByCoordinates(
    latitude: number,
    longitude: number
  ): Promise<(T & { documentId: string })[]> {
    const q = query(
      ref(realtimeDb, this.collectionName),
      orderByChild("location/latitude"),
      equalTo(latitude)
    );
    const snapshot = await get(q);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data)
        .filter(([_, value]) => (value as any).location.longitude === longitude)
        .map(([id, value]) => ({
          documentId: id,
          ...(value as object),
        })) as (T & { documentId: string })[];
    }
    return [];
  }

  async create(data: Omit<T, "id">, customId?: string): Promise<string> {
    const newRef = customId
      ? ref(realtimeDb, `${this.collectionName}/${customId}`)
      : push(ref(realtimeDb, this.collectionName));

    await set(newRef, { ...data, id: customId || newRef.key });
    return newRef.key!;
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    await update(ref(realtimeDb, `${this.collectionName}/${id}`), data);
  }

  async delete(id: string): Promise<void> {
    await remove(ref(realtimeDb, `${this.collectionName}/${id}`));
  }

  async login(
    usernameOrEmail: string,
    password: string
  ): Promise<{ success: boolean; userData?: any }> {
    if (!usernameOrEmail || !password) return { success: false };

    const q = query(
      ref(realtimeDb, this.collectionName),
      orderByChild("email"),
      equalTo(usernameOrEmail)
    );
    const snapshot = await get(q);

    if (snapshot.exists()) {
      const users = snapshot.val();
      const userId = Object.keys(users)[0];
      const user = users[userId];

      if (user.password === password) {
        await update(ref(realtimeDb, `${this.collectionName}/${userId}`), {
          isAuthenticated: true,
        });
        const updatedUser = await get(
          ref(realtimeDb, `${this.collectionName}/${userId}`)
        );

        return {
          success: true,
          userData: { ...(updatedUser.val() as object), id: userId },
        };
      }
    }

    return { success: false };
  }

  async signup(
    data: Omit<T, "id">,
    customId?: string,
    email?: string
  ): Promise<string> {
    if (!email) throw new Error("Email is required");

    const q = query(
      ref(realtimeDb, this.collectionName),
      orderByChild("email"),
      equalTo(email)
    );
    const snapshot = await get(q);

    if (snapshot.exists()) {
      throw new Error("Email already exists");
    }

    return this.create(data, customId);
  }
}
