"use client";

import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type Props<T extends FieldValues = FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  rules?: RegisterOptions<T, Path<T>>; // ✅ fix type
  type?: "text" | "textarea" | "select" | "datetime";
  options?: Option[];
};

export default function FormField<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  rules,
  type = "text",
  options = [],
}: Props<T>) {
  return (
    <div>
      <label className="block font-medium">
        {label} {rules?.required ? <span className="text-red-500">*</span> : null}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            {type === "textarea" ? (
              <textarea
                {...field}
                placeholder={placeholder}
                rows={3}
                className="w-full border rounded p-2"
              />
            ) : type === "select" ? (
              <select {...field} className="w-full border rounded p-2">
                <option value="">-- Chọn --</option>
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : type === "datetime" ? (
              <input
                type="datetime-local"
                {...field}
                className="w-full border rounded p-2"
              />
            ) : (
              <input
                {...field}
                type="text"
                placeholder={placeholder}
                className="w-full border rounded p-2"
              />
            )}

            {fieldState.error && (
              <p className="text-red-500 text-sm">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
}
