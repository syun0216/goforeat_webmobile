import React from "react";
import { observer, inject } from "mobx-react";

import { IConfirmOrder } from "../../interfaces";

@inject("ConfirmOrderMobx")
@observer
export default class ConfirmOrder extends React.Component<IConfirmOrder, {}> {

    constructor(props: IConfirmOrder) {
        super(props)
    }

    public componentDidMount() {
        this.props.hideLoading();
        // let { dateFoodId } = this.props.ConfirmOrderMobx
        this.props.ConfirmOrderMobx.dateFoodId = this.props.match.params.dateFoodId;
    }

    public render(): any {
        const { dateFoodId } = this.props.ConfirmOrderMobx
        return (
            <div>
                <span>{dateFoodId}</span>
            </div>
        )
    };
}