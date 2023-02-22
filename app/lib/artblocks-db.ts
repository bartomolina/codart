import prisma from "./prisma";

const getCollectionDataFromDB = async (id: string) => {
  const collection = await prisma.collection.findFirst({
    where: {
      id,
    },
  });

  return collection;
};

export default getCollectionDataFromDB;
