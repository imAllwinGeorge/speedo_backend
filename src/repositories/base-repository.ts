import { Model } from "mongoose";
import type { FilterQuery, IBaseRepository } from "../interfaces/repositories/base-repository.interface";


export class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected model: Model<T>) {}

  async find(filter: FilterQuery<T>): Promise<T[]> {
    return this.model.find(filter).sort({createdAt: -1});
  }

  async findAll(
    limit: number,
    skip: number,
    filter: FilterQuery<object>,
  ): Promise<{ items: T[]; total: number }> {
    const [items, total] = await Promise.all([
      this.model
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      this.model.countDocuments(filter),
    ]);
    return { items, total };
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async save(data: Partial<T>): Promise<T> {
    const doc = new this.model(data);
    await doc.save();
    return doc;
  }

  async findOneAndUpdate(
    filter: FilterQuery<any>,
    value: Partial<T>,
  ): Promise<T | null> {
    return this.model.findOneAndUpdate(filter, { $set: value }, { new: true });
  }

  async findByIdAndUpdate(id: string, value: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, { $set: value }, { new: true });
  }

  async delete(id: string): Promise<void> {
    const query = this.model.findByIdAndDelete(id);
    await query.lean();
  }
}
