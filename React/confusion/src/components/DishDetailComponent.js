import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
} from 'reactstrap';



function fmtdate(commentdate) {
    let date = new Date(commentdate)

    let formatted = new Intl.DateTimeFormat('en-US', {
        // VALUES CAN BE "LONG", "SHORT", OR "NUMERIC"

        month: 'short',
        day: 'numeric',
        year: 'numeric',

        // 12 OR 24 HOURS TIME
        hour12: true
    }).format(date);
    // console.log(formatted);
    return formatted;

}

function RenderDish(prop) {
    return (
        <Card>
            <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
            <CardBody>
                <CardTitle>{this.props.dish.name}</CardTitle>
                <CardText>{this.props.dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function RenderComments({ comments }) {

    if (comments != null) {
        console.log(comments);
        const values = comments.map((comment) => {
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardBody>
                            <CardTitle><h4>Comments</h4></CardTitle>

                            <CardText>
                                <div key={comment.id}>
                                    <ul className="list-unstyled">
                                        <li>{comment.comment}</li>
                                        <li>--{comment.author}, {this.fmtdate(comment.date)}</li>
                                    </ul>
                                </div>
                            </CardText>
                        </CardBody>
                    </Card>



                </div>

            )
        });
        return (

            values

        );

    }
    else {
        return (
            <div>No Comments</div>);
    }
}


const DishDetail = (props) => {
    if (this.props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">


                        <RenderDish dish={props.dish} />
                    </div>
                    {/* <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardBody>
                                <CardTitle><h4>Comments</h4></CardTitle>

                                <CardText>
                                <RenderComments comments={props.dish.comments} />
                                </CardText>
                            </CardBody>
                        </Card>



                    </div> */}
                    <RenderComments comments={props.dish.comments} />
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        )
    }

}

export default DishDetail