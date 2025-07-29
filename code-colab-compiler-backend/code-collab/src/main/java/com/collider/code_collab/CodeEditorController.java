package com.collider.code_collab;

import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@AllArgsConstructor
public class CodeEditorController {

    @MessageMapping("/room/{roomId}/edit")
    @SendTo("/topic/room/{roomId}")
    public CodeEditor codeSocket(@DestinationVariable String roomId, CodeEditor codeEditor) {
        return codeEditor;
    }
}
