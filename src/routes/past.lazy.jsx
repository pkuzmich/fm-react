import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/past")({
  component: Past,
});

function Past() {
  return <div>Past</div>;
}
