import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  name?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AdErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        `[AdErrorBoundary] ${this.props.name ?? "unknown"} crashed:`,
        error,
        info.componentStack,
      );
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl"
          style={{
            background: "rgba(17,24,39,0.95)",
            border: "1px solid rgba(239,68,68,0.3)",
            minHeight: 200,
          }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "rgba(239,68,68,0.15)" }}
          >
            <span className="text-red-400 text-2xl">⚠</span>
          </div>
          <div className="text-center space-y-1">
            <p className="text-white font-semibold text-sm">
              {this.props.name
                ? `${this.props.name} crashed`
                : "Something went wrong"}
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <p className="text-red-400/70 text-xs font-mono max-w-sm truncate">
                {this.state.error.message}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={this.handleReset}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white/70 hover:text-white border border-white/20 hover:border-white/40 transition-colors"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={this.handleReload}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white"
              style={{
                background: "linear-gradient(135deg,#2563eb,#4f46e5)",
              }}
            >
              Reload Ad Studio
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
