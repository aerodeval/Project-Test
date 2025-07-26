import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"


      style={
        {
          "--normal-bg": "black",
          "--normal-text": "white",
          "--normal-border": "var(--border)",
          "--success-bg": "#22c55e",      // Tailwind green-500
          "--success-text": "#fff",
          "--error-bg": "#ef4444",        // Tailwind red-500
          "--error-text": "#fff",
          
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
