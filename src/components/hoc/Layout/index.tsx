import * as React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import UserList from 'components/containers/UserList'
import UserDetail from 'components/containers/UserDetail'
import { RouteComponentProps } from 'react-router'

class Layout extends React.PureComponent<RouteComponentProps> {
    render() {
        const { children } = this.props
        return (
            <>
                {children}
                <Switch>
                    <Route exact path="/" component={UserList} />
                    <Route exact path="/list" component={UserList} />
                    <Route exact path="/detail" component={UserDetail} />
                </Switch>
            </>
        )
    }
}

export default withRouter(Layout)
