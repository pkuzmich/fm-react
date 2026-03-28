import { useMutation } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { postContact } from "../api/postContact";
import { useFormStatus } from "react-dom";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function ContactInput(props) {
  const { name, type, placeholder } = props;
  const { pending } = useFormStatus();
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      disabled={pending}
    />
  );
}

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: function (formData) {
      return postContact({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      });
    },
  });

  return (
    <div className="contact">
      <h2>Contact</h2>
      {mutation.isSuccess ? (
        <h3>Thank you for your message!</h3>
      ) : (
        <form action={mutation.mutate}>
          <ContactInput name="name" type="text" placeholder="Name" />
          <ContactInput name="email" type="email" placeholder="E-mail" />
          <textarea name="message" placeholder="Message"></textarea>
          <button>Submit</button>
        </form>
      )}
    </div>
  );
}
