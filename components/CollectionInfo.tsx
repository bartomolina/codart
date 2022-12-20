export default function CollectionDetails(props: any) {
  return (
    <>
      <section aria-labelledby="applicant-information-title">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
              Applicant Information
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Application for</dt>
                <dd className="mt-1 text-sm text-gray-900">Backend Developer</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900">ricardocooper@example.com</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
                <dd className="mt-1 text-sm text-gray-900">$120,000</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">+1 555-555-5555</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">About</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat.
                  Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident.
                  Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <a
              href="#"
              className="block bg-gray-50 px-4 py-4 text-center text-sm font-medium text-gray-500 hover:text-gray-700 sm:rounded-b-lg"
            >
              Read full application
            </a>
          </div>
        </div>
      </section>
      <h2 className="sr-only" id="section-2-title">
        Collection Details
      </h2>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <div>
            <label htmlFor="script" className="block text-sm font-medium text-gray-700">
              Script
            </label>
            <div className="mt-1">
              <textarea
                rows={4}
                name="script"
                id="script"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue={""}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
