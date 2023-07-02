import { Category } from "@prisma/client";
import client from "../client";
import { QueryOptions } from "../types";

export const getCategoriesQuery = async (
  options?: QueryOptions
): Promise<Category[]> => {
  const { orderBy, skip, take } = options || {};

  const categories = await client.category.findMany({
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: { updatedAt: orderBy },
  });

  return categories;
};

export const getCategoryQuery = async (
  id: string
): Promise<Category | null> => {
  const category = await client.category.findUnique({
    where: { id: Number(id) },
  });

  return category;
};
