import * as React from 'react';
//style
import "./EditInfo.less"

import {IEditInfo} from '../../interfaces';

export default class EditInfo extends React.Component<IEditInfo> {

    constructor(props: any)  {
        super(props)
    }

    public componentDidMount() {
        this.props.hideLoading()
    }

    public render() {
        return (
            <div>
                1
            </div>
        )
    }
}