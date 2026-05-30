import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MediaFrame } from "@/components/site/media-frame";

export const mdxComponents = {
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-6 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  a: ({
    className,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http");
    return (
      <Link
        href={href || "#"}
        className={cn(
          "font-medium text-primary underline underline-offset-4 hover:text-primary/80",
          isExternal && "after:content-['_↗']",
          className
        )}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      />
    );
  },
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "mt-6 border-l-4 border-primary pl-6 italic text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  code: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...props}
    />
  ),
  pre: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg bg-muted p-4",
        className
      )}
      {...props}
    />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-border" {...props} />
  ),
  img: ({
    className,
    alt,
    src,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src) return null;
    const imageSrc = typeof src === "string" ? src : "";
    const { width: _width, height: _height, ...rest } = props;
    return (
      <Image
        src={imageSrc}
        alt={alt || ""}
        width={1200}
        height={630}
        className={cn("rounded-lg my-8", className)}
        {...rest}
      />
    );
  },
  MediaFrame,
  MediaRow: ({ children }: { children: React.ReactNode }) => (
    <div className="not-prose my-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
      {children}
    </div>
  ),
  Callout: ({
    variant = "info",
    children,
  }: {
    variant?: "info" | "warning" | "tip";
    children: React.ReactNode;
  }) => {
    const variants = {
      info: "border-blue-500/50 bg-blue-500/10 text-blue-300",
      warning: "border-yellow-500/50 bg-yellow-500/10 text-yellow-300",
      tip: "border-green-500/50 bg-green-500/10 text-green-300",
    };
    return (
      <div
        className={cn(
          "my-6 rounded-lg border p-4",
          variants[variant]
        )}
      >
        {children}
      </div>
    );
  },
};
