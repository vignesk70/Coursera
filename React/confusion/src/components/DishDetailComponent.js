import React, { Component } from "react";
import {
  Button,
  Label,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  render() {
    console.log("Props", this.props.dish);
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-edit" /> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                dishId: this.props.dishId,
                author: "",
                rating: "1",
                comment: "",
              }}
              validate={(values) => {
                const errors = {};
                const maxlength = 15;
                const minlength = 3;
                if (!values.author) {
                  errors.author = "User Name is Required";
                } else if (values.author.length < minlength) {
                  errors.author =
                    "Must be greater than " + (minlength - 1) + " characters";
                } else if (values.author.length > maxlength) {
                  errors.author =
                    "Must be less than " + maxlength + " characters";
                }

                return errors;
              }}
              onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                // alert(JSON.stringify(values, null, 2));

                this.props.postComment(
                  this.props.dishId,
                  values.rating,
                  values.author,
                  values.comment
                );
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Row>
                    <Label htmlFor="rating" md={2}>
                      Rating
                    </Label>
                    <Field as="select" name="rating">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Field>
                  </Row>
                  <Row>
                    <Label htmlFor="author" md={2}>
                      Username
                    </Label>
                    {/* <Col sm={10}> */}
                    <Field type="text" name="author" />
                    <ErrorMessage
                      className="text-danger"
                      name="author"
                      component="div"
                    />
                    {/* </Col> */}
                  </Row>

                  <Row>
                    <Label htmlFor="message" md={2}>
                      Comment
                    </Label>
                    {/* <Col md={{ size: 10, offset: 2 }}> */}
                    <Field
                      className="text-area"
                      as="textarea"
                      rows="12"
                      name="comment"
                    />

                    {/* </Col> */}
                  </Row>
                  <br />
                  <Button color="primary" type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function fmtdate(commentdate) {
  let date = new Date(commentdate);

  let formatted = new Intl.DateTimeFormat("en-US", {
    // VALUES CAN BE "LONG", "SHORT", OR "NUMERIC"

    month: "short",
    day: "numeric",
    year: "numeric",

    // 12 OR 24 HOURS TIME
    hour12: true,
  }).format(date);
  // console.log(formatted);
  return formatted;
}

function RenderDish(props) {
  //   console.log(props);
  //   console.log(props.dish.image);
  return (
    <FadeTransform
      in
      transformProps={{ exitTransform: "scale(0.5) translateY(-50%)" }}
    >
      <Card>
        <CardImg top src={baseUrl + props.dish.image} alt={props.dish.name} />
        <CardBody>
          <CardTitle>{props.dish.name}</CardTitle>
          <CardText>{props.dish.description}</CardText>
        </CardBody>
      </Card>
    </FadeTransform>
  );
}

function RenderComments({ comments, postComment, dishId }) {
  if (comments != null) {
    // console.log(comments);

    return (
      <div>
        <ul className="list-unstyled">
          <Stagger in>
            {comments.map((comment) => {
              return (
                <Fade in>
                  <li key={comment.id}>
                    <p>{comment.comment}</p>

                    <p>
                      {" "}
                      --{comment.author}, {fmtdate(comment.date)}
                    </p>
                  </li>
                </Fade>
              );
            })}
          </Stagger>
        </ul>
      </div>
    );
    //     const values = comments.map((comment) => {
    //       return (
    // <Stagger in
    //               ><Fade in>
    //           <div key={comment.id}>
    //             <ul className="list-unstyled">

    //               <li>{comment.comment}</li>
    //               <li>
    //                 --{comment.author}, {fmtdate(comment.date)}
    //               </li>

    //             </ul>
    //           </div>
    //           </Fade>
    //               </Stagger>
    //       );
    //     });
    //     return values;
  } else {
    return <div>No Comments</div>;
  }
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    console.log("Dishdetail: ", props);
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-6 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-6 col-md-5 m-1">
            <Card>
              <CardBody>
                <CardTitle>
                  <h4>Comments</h4>
                </CardTitle>

               {/* <CardText>  */}
                  <RenderComments
                    comments={props.comments}
                    postComment={props.postComment}
                    dishId={props.dish.id}
                  />
                {/* </CardText> */}
                <CommentForm
                  dishId={props.dish.id}
                  postComment={props.postComment}
                />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
