package com.collider.code_collab;

import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.Map;

@Controller
@AllArgsConstructor
public class CodeEditorController {

    SimpMessagingTemplate messagingTemplate;
    private final Map<String,String > map = new HashMap<>();

    @MessageMapping("/room/{roomId}/edit")
    @SendTo("/topic/room/{roomId}")
    public CodeEditor codeSocket(@DestinationVariable String roomId, CodeEditor codeEditor) {
        map.put(roomId, codeEditor.getContent());
        return codeEditor;
    }

    @MessageMapping("room/{roomId}/sync")
    public void sync(@DestinationVariable String roomId) {
        String current = map.get(roomId);
        CodeEditor latest = new CodeEditor();
        latest.setContent(current);
        messagingTemplate.convertAndSend("/topic/room/" + roomId, latest);
    }
}
