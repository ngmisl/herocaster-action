import { createSystem } from "frog/ui";

export const {
    Box,
    Columns,
    Column,
    Heading,
    HStack,
    Rows,
    Row,
    Spacer,
    Text,
    VStack,
    vars,
} = createSystem({
    colors: {
        text: '#6B7280',  // Cool Gray
        background: '#000',  // Light Gray
        pastelBlue: '#A7C7E7',  // Pastel Blue
        pastelGreen: '#A1DE93',  // Pastel Green
        pastelPink: '#F7A8B8',  // Pastel Pink
        pastelYellow: '#FFF3B0',  // Pastel Yellow
        pastelPurple: '#D4A5E0',  // Pastel Purple
    }
});
