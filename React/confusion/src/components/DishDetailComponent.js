import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import {Link} from 'react-router-dom';


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

function RenderDish(props) {
    console.log(props)
    console.log(props.dish.image)
    return (
        <Card>
            <CardImg top src={props.dish.image} alt={props.dish.name} />
            <CardBody>
                <CardTitle>{props.dish.name}</CardTitle>
                <CardText>{props.dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function RenderComments({ comments }) {

    if (comments != null) {
        // console.log(comments);
        const values = comments.map((comment) => {
            return (
                <div className="col-12 col-md-5 m-1">

                                <div key={comment.id}>
                                    <ul className="list-unstyled">
                                        <li>{comment.comment}</li>
                                        <li>--{comment.author}, {fmtdate(comment.date)}</li>
                                    </ul>
                                </div>




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
    if (props.dish != null) {
        console.log(props);
        return (
            <div className="container">
                <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">


                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardBody>
                                <CardTitle><h4>Comments</h4></CardTitle>

                                <CardText>
                                <RenderComments comments={props.comments} />
                                </CardText>
                            </CardBody>
                        </Card>



                    </div>

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