import { Component, ErrorInfo, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  fallback?: ReactNode
}

interface IState {
  hasError: boolean
}

class ErrorBoundary extends Component<IProps, IState> {
  public state: IState = {
    hasError: false,
  }

  public static defaultProps: IProps = {
    fallback: <div>Sorry… there was an error</div>,
  }

  public static getDerivedStateFromError(_: Error): IState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return <p style={{ backgroundColor: 'rgba(255,0,0, .15)', color: 'red', padding: '1rem', borderRadius: '.5rem' }}>{this.props.fallback}</p>
    }

    return this.props.children
  }
}

export default ErrorBoundary
