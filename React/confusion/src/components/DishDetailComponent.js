import React from "react";
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
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

class CommentForm extends React.Component {
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
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-edit" /> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            {/* <Formik
              initialValues={{
                rating: "1",
                username: "",
                comment: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.username) {
                  errors.firstname = "First Name is Required";
                } else if (values.username.length < this.minlength) {
                  errors.username =
                    "Must be greater than " +
                    (this.minlength - 1) +
                    " characters";
                } else if (values.username.length > this.maxlength) {
                  errors.username =
                    "Must be less than " + this.maxlength + " characters";
                }

                return errors;
              }}
              onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Form>
                    <Row>
                      <Col>
                        <Label htmlFor="rating">Your Name</Label>
                        <Field as="select" id="rating" name="rating">
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </Field>
                      </Col>
                    </Row>
                    <Label htmlFor="username">Username</Label>
                    <Field type="text" id="username" name="username"></Field>
                    <Label htmlFor="comment">Comment</Label>
                    <Field type="text" id="comment" name="comment"></Field>
                  </Form>
                  <Button color="primary" type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </Form>
              )}
            </Formik> */}
            <Formik
              initialValues={{
                username: "",
                rating: "1",
                comment: "",
              }}
              validate={(values) => {
                const errors = {};
                const maxlength=15;
                const minlength= 3;
                console.log(minlength,maxlength)
                if (!values.username) {
                  errors.username = "User Name is Required";
                } else if (values.username.length < minlength) {
                  errors.username =
                    "Must be greater than " +
                    (minlength - 1) +
                    " characters";
                } else if (values.username.length > maxlength) {
                  errors.username =
                    "Must be less than " + maxlength + " characters";
                }

                return errors;
              }}
              onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
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

                    <Label htmlFor="username" md={2}>
                      Username
                    </Label>
                    {/* <Col sm={10}> */}
                      <Field type="text" name="username" />
                      <ErrorMessage
                        className="text-danger"
                        name="username"
                        component="div"
                      />
                    {/* </Col> */}
                  </Row>

                  <Row>
                    <Label htmlFor="message" md={2}>
                      Comment
                    </Label>
                    {/* <Col md={{ size: 10, offset: 2 }}> */}
                      <Field className="text-area" as="textarea" rows="12" name="comment" />

                    {/* </Col> */}
                  </Row>
                  <br/>
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
  console.log(props);
  console.log(props.dish.image);
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
        <div >
          <div key={comment.id}>
            <ul className="list-unstyled">
              <li>{comment.comment}</li>
              <li>
                --{comment.author}, {fmtdate(comment.date)}
              </li>
            </ul>
          </div>
        </div>
      );
    });
    return values;
  } else {
    return <div>No Comments</div>;
  }
}

const DishDetail = (props) => {
  if (props.dish != null) {
    console.log(props);
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

                <CardText>
                  <RenderComments comments={props.comments} />
                  <CommentForm />
                </CardText>
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
