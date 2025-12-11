import React from 'react'

const DefaultErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div
      style={{
        padding: 24,
        maxWidth: 720,
        margin: '40px auto',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        background: '#fff'
      }}
    >
      <h2 style={{ marginTop: 0 }}>Something went wrong</h2>
      <p style={{ color: '#374151' }}>
        Please try again. If the problem persists, refresh the page.
      </p>

      {error?.message ? (
        <pre
          style={{
            padding: 12,
            borderRadius: 8,
            background: '#f9fafb',
            overflowX: 'auto'
          }}
        >
          {error.message}
        </pre>
      ) : null}

      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <button type="button" onClick={resetErrorBoundary}>
          Try again
        </button>
        <button type="button" onClick={() => window.location.reload()}>
          Refresh page
        </button>
      </div>
    </div>
  )
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta?.env?.DEV) {
      console.error('Unhandled UI error:', error, errorInfo)
    }
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallback || DefaultErrorFallback

      return (
        <Fallback
          error={this.state.error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
