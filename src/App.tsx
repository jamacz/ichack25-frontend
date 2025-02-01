import { useCallback, useState } from "react";
import "./App.css";
import { Icon } from "@iconify/react";

const INPUT = "bg-gray-100 rounded-3xl px-6 py-4";

function App() {
  const [description, setDescription] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>("");
  const [earlyAccess, setEarlyAccess] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  const [improvements, setImprovements] = useState<string[]>([]);
  const [positivity, setPositivity] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalPlayTime, setTotalPlayTime] = useState<number>(0);

  const submit = useCallback(() => {
    setLoading(true);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    );
  }

  if (loaded) {
    return <div className="flex flex-col h-full"></div>;
  }

  return (
    <div className="flex flex-col h-full">
      <h1 className="ml-2 text-3xl font-semibold px-12 pt-12 pb-8 border-b-2 border-gray-100">
        Steam Performance Predictor
      </h1>
      <div className="flex flex-col gap-8 px-12 py-8 overflow-y-auto">
        <Field name="Description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${INPUT} resize-none`}
            placeholder="Enter description..."
            rows={5}
          ></textarea>
        </Field>
        <Field name="Release Date">
          <input
            className={INPUT}
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </Field>
        <Field name="Price">
          <div className="flex flex-row gap-2 items-center bg-gray-100 rounded-3xl px-6">
            <p className="opacity-75">$</p>
            <input
              className="flex-1 py-4"
              type="number"
              min={0}
              step={0.01}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </Field>
        <Field name="Tags">
          <div className="flex flex-row gap-2 items-center bg-gray-100 rounded-3xl px-6">
            {tags.sort().map((tag) => (
              <div className="flex flex-row items-center gap-2 px-1 bg-blue-500 py-0.5 rounded-full">
                <p className="ml-3 text-white font-medium">{tag}</p>
                <button
                  className="self-stretch flex items-center cursor-pointer px-1"
                  onClick={() => setTags(tags.filter((t) => t !== tag))}
                >
                  <Icon
                    icon="material-symbols:close"
                    className="text-white cursor-pointer"
                  />
                </button>
              </div>
            ))}
            <input
              className="flex-1 py-4"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (currentTag === "" || tags.includes(currentTag)) return;
                  setTags([...tags, currentTag]);
                  setCurrentTag("");
                }
              }}
            />
          </div>
        </Field>
        <Field name="Early Access Flag">
          <button
            className={`w-20 rounded-full p-1.5 cursor-pointer ${
              earlyAccess ? "bg-blue-500" : "bg-gray-300"
            } transition-all`}
            onClick={() => setEarlyAccess(!earlyAccess)}
          >
            <div
              className={`${
                earlyAccess ? "ml-10" : ""
              } transition-all w-7 aspect-square bg-white rounded-full`}
            ></div>
          </button>
        </Field>
        <button
          className="cursor-pointer self-start px-12 mt-4 bg-blue-500 text-white rounded-3xl py-4 font-semibold text-xl"
          onClick={submit}
        >
          Predict
        </button>
      </div>
    </div>
  );
}

function Field({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <p className="ml-3 font-medium">{name}</p>
        <Icon
          className="text-xs text-orange-700"
          icon="material-symbols:asterisk-rounded"
        />
      </div>
      {children}
    </div>
  );
}

export default App;
