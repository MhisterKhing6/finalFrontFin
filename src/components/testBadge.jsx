import { FaCheck } from "react-icons/fa";
import { Badge, Stack} from "react-bootstrap";
 

const TestCheck = ({name}) => {
    return (
        <Badge bg="success">
        <Stack direction="horizontal" gap={5}>
            <h4>{name}</h4>
            <FaCheck size={40} />
        </Stack>
        </Badge>
    )
}

export {TestCheck}