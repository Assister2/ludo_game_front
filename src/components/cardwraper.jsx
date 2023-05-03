import React from "react";
import { Card } from "react-bootstrap";
import Wraper from "./wraper";

export default function CardWraper({
  size = 6,
  title = "Title",
  children,
  style,
}) {
  return (
    <Wraper colSize={size} style={style}>
      <Card style={{ marginTop: 20 }}>
        <Card.Header>{title}</Card.Header>
        <Card.Body>{children}</Card.Body>
      </Card>
    </Wraper>
  );
}
