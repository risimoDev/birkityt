/**
 * Renders one Schema.org block as JSON-LD.
 *
 * `JSON.stringify` escapes nothing that matters for HTML, so `<` is replaced
 * to make it impossible for admin-entered content to close the script tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
