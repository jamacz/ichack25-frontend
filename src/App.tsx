import "./App.css";

const INPUT = "bg-slate-100 rounded-3xl px-6 py-4";

function App() {
  return (
    <div className="flex flex-col gap-4 p-12">
      <h1 className="text-3xl font-semibold mb-2">Hello world</h1>
      <Field name="Description">
        <textarea
          className={`${INPUT} resize-none`}
          placeholder="Enter description..."
          rows={5}
        ></textarea>
      </Field>
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
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <p className="ml-2">{name}</p>
        <p>*</p>
      </div>
      {children}
    </div>
  );
}

export default App;
