import { useState } from 'react'

function ConfigCard({
  config,
  updateValue,
}) {
  const [inputValue, setInputValue] =
    useState(config.value)

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-bold">
            {config.key}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Runtime configuration
          </p>
        </div>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm h-fit">
          Active
        </span>
      </div>

      <input
        value={inputValue}
        onChange={(e) =>
          setInputValue(e.target.value)
        }
        className="
          w-full
          border
          rounded-lg
          p-3
          mt-5
          outline-none
          focus:ring-2
          focus:ring-black
        "
      />

      <div className="bg-gray-100 rounded-lg p-3 mt-4">
        <p className="text-red-500 text-sm">
          Old Value: {config.value}
        </p>

        <p className="text-green-600 text-sm mt-2">
          Current Value: {inputValue}
        </p>
      </div>

      <div className="flex justify-end mt-5">
        <button
          onClick={() =>
            updateValue(
              config.key,
              inputValue
            )
          }
          className="
            bg-black
            text-white
            px-5
            py-3
            rounded-lg
            hover:bg-gray-800
          "
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default ConfigCard