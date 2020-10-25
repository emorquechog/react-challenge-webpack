import * as React from 'react'
import { withRouter } from 'react-router'

const queryString = require('query-string')

function withQueryParams(WrappedComponent: React.ComponentType<any>) {
    return withRouter((props: any) => {
        const queryParams = queryString.parse(props.location.search) // props.location provided by React Router
        const newProps = {
            ...props,
            queryParams
        }

        // eslint-disable-next-line react/jsx-props-no-spreading
        return <WrappedComponent {...newProps} />
    })
}

export default withQueryParams
