export abstract class BaseRepository<T> {
  abstract create(data: Partial<T>): Promise<T>;
  abstract findAll(page?: number, limit?: number): Promise<T[]>;
  abstract delete(id: string): Promise<T | null>;
  abstract update(id: string, data: Partial<T>): Promise<T | null>;
}
