interface TerminalLineProps {
  command: string;
  output?: string;
  children?: React.ReactNode;
}

export default function TerminalLine({
  command,
  output,
  children,
}: TerminalLineProps) {
  return (
    <div className="font-mono text-sm">
      <div className="text-muted">
        $ {command}
      </div>
      {output && <div className="text-text mt-1 ml-4">{output}</div>}
      {children && <div className="mt-1 ml-4">{children}</div>}
    </div>
  );
}
