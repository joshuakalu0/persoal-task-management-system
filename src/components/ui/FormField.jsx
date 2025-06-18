import React from "react";

const FormField = ({ field, register, errors, className = "" }) => {
  const getInputWidth = (width) => {
    switch (width) {
      case "full":
        return "w-full";
      case "half":
        return "w-1/2";
      case "third":
        return "w-1/3";
      case "quarter":
        return "w-1/4";
      default:
        return "w-full";
    }
  };

  const renderField = (field) => {
    const baseClasses = `p-3 rounded-lg bg-background border border-text-primary text-foreground ${getInputWidth(
      field.width
    )} ${className}`;

    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "number":
      case "date":
        return (
          <input
            type={field.type}
            placeholder={field.placeholder}
            {...register(field.name)}
            className={baseClasses}
          />
        );

      case "textarea":
        return (
          <textarea
            placeholder={field.placeholder}
            {...register(field.name)}
            className={`${baseClasses} min-h-[100px]`}
          />
        );

      case "select":
        return (
          <select {...register(field.name)} className={baseClasses}>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };
  if (field.type == "double") {
    return (
      <div className="grid grid-cols-2 gap-4 w-full">
        {field.fields.map((item, id) => (
          <div className={`space-y-1 w-full }`} key={id}>
            {item.label && (
              <label className="block text-sm font-medium text-text-primary mb-1">
                {item.label}
              </label>
            )}
            {renderField(item)}
            {errors?.[item.name] && (
              <p className="text-destructive text-sm">
                {errors[item.name].message}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-1 ${getInputWidth(field.width)}`}>
      {field.label && (
        <label className="block text-sm font-medium text-text-primary mb-1">
          {field.label}
        </label>
      )}
      {renderField(field)}
      {errors?.[field.name] && (
        <p className="text-destructive text-sm">{errors[field.name].message}</p>
      )}
    </div>
  );
};

export default FormField;

// Example usage:
/*
const fields = [
  {
    name: "title",
    type: "text",
    label: "Title",
    placeholder: "Enter title",
    width: "full"
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    placeholder: "Enter description",
    width: "full"
  },
  {
    name: "status",
    type: "select",
    label: "Status",
    width: "half",
    options: [
      { value: "TODO", label: "To Do" },
      { value: "IN_PROGRESS", label: "In Progress" },
      { value: "DONE", label: "Done" }
    ]
  }
];

// In your form component:
const { register, handleSubmit, formState: { errors } } = useForm();

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div className="flex flex-wrap gap-4">
      {fields.map((field) => (
        <FormField
          key={field.name}
          field={field}
          register={register}
          errors={errors}
        />
      ))}
    </div>
  </form>
);
*/
