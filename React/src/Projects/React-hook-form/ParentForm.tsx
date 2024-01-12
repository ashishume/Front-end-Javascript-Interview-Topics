import React from "react";
import styles from "./style.module.scss";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
const ParentForm = () => {
  const onFormSubmit = (val: any) => {
    console.log(val);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<any>();
  return (
    <div className={styles.container} onSubmit={handleSubmit(onFormSubmit)}>
      <form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
            name="email"
          />
          <Form.Text className="text-muted">
            {errors?.email?.message as any}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            {...register("username", {
              required: true,
            })}
            name="username"
          />
          <Form.Text className="text-muted">
            {errors.username && <p>error occured</p>}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter age"
            {...register("age", {
              required: true,
            })}
            name="age"
          />
          <Form.Text className="text-muted">
            {errors.age && <p>error occured</p>}
          </Form.Text>
        </Form.Group>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default ParentForm;
