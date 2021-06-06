import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col
} from 'reactstrap';

class DishDetail extends Component {


    fmtdate(commentdate) {
        let date = new Date(commentdate)

        let formatted = new Intl.DateTimeFormat('en-US', {
            // VALUES CAN BE "LONG", "SHORT", OR "NUMERIC"

            month: 'short',
            day: 'numeric',
            year: 'numeric',

            // 12 OR 24 HOURS TIME
            hour12: true
        }).format(date);
        console.log(formatted);
        return formatted;

    }

    renderComments(comments) {

        if (comments != null) {
            console.log(comments);
            const values = comments.map((comment) => {
                return (
                    <div key={comment.id}>
                        <ul>
                        <li styleName="none">{comment.comment}</li>
                        <li>--{comment.author}, {this.fmtdate(comment.date)}</li>
                        </ul>
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


    render() {


        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">

                    <Card>
                        <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                        <CardBody>
                            <CardTitle>{this.props.dish.name}</CardTitle>
                            <CardText>{this.props.dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardBody>
                            <CardTitle><h4>Comments</h4></CardTitle>

                            <CardText>{this.renderComments(this.props.dish.comments)}

                            </CardText>
                        </CardBody>
                    </Card>



                </div>
            </div>
        );
    }

}

export default DishDetail