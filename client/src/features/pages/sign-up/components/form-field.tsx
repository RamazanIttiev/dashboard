export const FormField = (props: {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}) => (
  <div>
    <label class='label-text' for={props.id}>
      {props.label}
    </label>
    <input
      id={props.id}
      type={props.type}
      class='input'
      placeholder={props.placeholder}
      required={props.required}
    />
  </div>
);
