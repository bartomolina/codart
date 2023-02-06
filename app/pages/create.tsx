import { ChangeEventHandler, FormEvent, useState } from "react";
import Head from "next/head";
import { ethers } from "ethers";

const Create = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    supply: "",
    price: 0.0001,
    library: "",
    code: "",
    type: "",
  });

  const handleFormChange = (event: FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  return (
    <>
      <Head>
        <title>Create - CodArt</title>
        <meta name="description" content="CodArt" />
      </Head>
      <header className="mx-auto max-w-6xl sm:px-6 lg:px-8 py-8">
        <h1 className="text-5xl font-thin leading-tight tracking-tight text-gray-900">Create</h1>
      </header>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 pb-44 pt-5">
          <form className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div>
                  <h3 className="text-2xl font-medium leading-6 text-gray-900">Collection</h3>
                  <p className="mt-1 text-gray-500">
                    Generic information about your collection. Set Max. Supply to 0 for unlimited supply.
                  </p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleFormChange}
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="supply" className="block text-sm font-medium text-gray-700">
                      Max. Supply
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        id="supply"
                        name="supply"
                        value={formData.supply}
                        onChange={handleFormChange}
                        className="block w-full max-w-fit rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        id="price"
                        name="price"
                        step="0.0001"
                        value={formData.price}
                        onChange={handleFormChange}
                        className="block w-full max-w-fit rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <h3 className="pt-3 text-2xl font-medium leading-6 text-gray-900">Code</h3>
                  <p className="mt-1 text-gray-500">Currently supporting p5.js based projects.</p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6">
                  <div>
                    <label htmlFor="library" className="block text-sm font-medium text-gray-700">
                      Library
                    </label>
                    <div className="mt-1">
                      <select
                        id="library"
                        name="library"
                        value={formData.library}
                        onChange={handleFormChange}
                        className="block w-full max-w-fit rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>p5.js</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                      Code
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="code"
                        name="code"
                        rows={4}
                        value={formData.code}
                        onChange={handleFormChange}
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <h3 className="pt-3 text-2xl font-medium leading-6 text-gray-900">Contract</h3>
                  <p className="mt-1 text-gray-500">Contract Type: Learn / Certification.</p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <div className="mt-1">
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleFormChange}
                        className="block w-full max-w-fit rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>Learn</option>
                        <option>Certification</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
