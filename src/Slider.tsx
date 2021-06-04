import { Component, ReactNode } from 'react'

interface SliderProps {
    children: ReactNode
    preview: string
}

interface SliderState {
    open: boolean
}

export default class Slider extends Component<SliderProps, SliderState> {
    state = {
        open: false,
    }
    render() {
        if (this.state.open) {
            return (
                <>
                    {this.props.children}
                    <br />
                    <div onClick={() => this.setState({ open: false })}>
                        Close
                    </div>
                </>
            )
        }
        return (
            <>
                {this.props.preview}
                <br />
                <div onClick={() => this.setState({ open: true })}>Open</div>
            </>
        )
    }
}
