import { ChangeEventHandler, FormEvent, useState } from "react";
import Head from "next/head";
import { ethers } from "ethers";

const Create = () => {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    supply: 0,
    price: 0.0001,
    library: "",
    code: "",
    type: "p5",
  });

  const handleFormChange = (event: FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    // setIsLoading(true);
    // event.preventDefault();

    // writeContract({
    //   mode: "recklesslyUnprepared",
    //   address: EscrowFactoryJSON.address,
    //   // @ts-ignore
    //   abi: EscrowFactoryJSON.abi,
    //   functionName: "createEscrow",
    //   args: [formData.goal, formData.arbiter, formData.beneficiary, Math.floor(formData.dueDate / 1000)],
    //   overrides: {
    //     value: formData.depositAmount,
    //   },
    // })
    //   // @ts-ignore
    //   .then((hash, wait) => {
    //     setIsWaitingTx(true);
    //     return waitForTransaction(hash);
    //   })
    //   .then((tx) => {
    //     setIsLoading(false);
    //     setIsWaitingTx(false);
    //     fetchGoals();
    //     clearForm();
    //     // @ts-ignore
    //     showNotification("Goal created", tx.transactionHash);
    //   })
    //   .catch((error) => {
    //     setIsLoading(false);
    //     showError("Error creating goal", error.message);
    //   });
  };

  return (
    <>
      <Head>
        <title>Create - CodArt.io</title>
        <meta name="description" content="CodArt" />
      </Head>
      <header className="mx-auto max-w-6xl sm:px-6 lg:px-8 py-8">
        <h1 className="text-5xl font-thin leading-tight tracking-tight text-gray-900">Create</h1>
      </header>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8 pb-44 pt-5">
          <form className="space-y-8 divide-y divide-gray-200 w-fit">
            <div className="flex flex-row space-x-20">
              <div>
                <div>
                  <h3 className="text-2xl font-medium leading-6 text-gray-900">Collection</h3>
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
                        className="block w-full max-w-fit rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="symbol" className="block text-sm font-medium text-gray-700">
                      Symbol
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="symbol"
                        name="symbol"
                        value={formData.symbol}
                        onChange={handleFormChange}
                        className="block w-full max-w-fit rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                  <h3 className="text-2xl font-medium leading-6 text-gray-900">Code</h3>
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
                        <option>p5</option>
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
                        rows={14}
                        value={formData.code}
                        onChange={handleFormChange}
                        className="block w-96 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex pt-5 justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-lg bg-indigo-600 px-3 py-2 text-white shadow-md hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
              >
                Create collection
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
