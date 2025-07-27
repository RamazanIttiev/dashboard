import { createSignal } from 'solid-js';

export const PasswordField = (props: {
  id: string;
  label: string;
  placeholder?: string;
  value: string | number | undefined;
  onChange: (e: InputEvent & { currentTarget: HTMLInputElement }) => void;
}) => {
  const [visible, setVisible] = createSignal(false);

  return (
    <div>
      <label class='label-text' for={props.id}>
        {props.label}
      </label>
      <div class='input'>
        <input
          id={props.id}
          type={visible() ? 'text' : 'password'}
          aria-hidden={visible()}
          placeholder={props.placeholder}
          required
          value={props.value}
          onInput={props.onChange}
        />
        <button
          type='button'
          class='block cursor-pointer'
          aria-label={props.id}
          onClick={() => setVisible((v) => !v)}
        >
          <span class={`icon-[tabler--eye] ${visible() ? 'block' : 'hidden'} size-5 shrink-0`} />
          <span
            class={`icon-[tabler--eye-off] ${!visible() ? 'block' : 'hidden'} size-5 shrink-0`}
          />
        </button>
      </div>
    </div>
  );
};
