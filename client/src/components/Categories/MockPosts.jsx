import { useState, useEffect, useContext } from "react";
import Max from "../Assets/Images/Max.jpeg";
import Gary from "../Assets/Images/Gary.jpg";
import Clay from "../Assets/Images/Clay.jpeg";
import { UserContext } from "../../contexts/UserContext";

const mockUsers = [
    { username: "Max", profileImage: Max },
    { username: "Gary", profileImage: Gary },
    { username: "Clay", profileImage: Clay },
];

const mockPosts = {
    "Strategy-and-Tips": [
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Help! I am stuck on level 4!",
            post_content: "I can't seem to get past level 4! Any suggestions?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Flip the switch in the corner and that should open the secret passage!",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I totally agree. This helped me get past that level too",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "How to defeat the boss in level 7?",
            post_content: "I'm having a hard time defeating the boss in level 7. Any tips?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Try using the power shield and aim for its weak spot!",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Make sure to dodge its attacks and attack during cooldown periods.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Running out of health potions too fast!",
            post_content: "Is there any way to preserve health potions?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Try to avoid unnecessary fights, and make use of your shield more often.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Don't forget to use health regeneration artifacts if you have any.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Can't find the secret treasure in level 5?",
            post_content: "I've heard there's a secret treasure in level 5. Where is it?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Check the northern part of the map, there should be a hidden cave.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "You'll need the golden key to unlock the chest inside the cave.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "How to improve crafting skills?",
            post_content: "I want to craft higher level items. How can I improve my skills?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Craft as many items as you can. The more you practice, the faster you level up.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Don't forget to read books and scrolls about crafting. They can boost your skills.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Where to find magic stones?",
            post_content: "I need magic stones to upgrade my gear. Any known locations?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "You can mine them in the Magic Mountain. But be careful, it's full of dangerous creatures.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Try trading with the old witch in the Enchanted Forest. She often has some.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Stuck in the puzzle in level 9!",
            post_content: "The puzzle in level 9 seems impossible. Can anyone help?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "The key is to start from the center and make your way outwards.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Remember the pattern: up, down, left, right, then reverse it.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "How to tame magical creatures?",
            post_content: "I want to tame magical creatures. Is there a specific method for it?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Each creature has a favorite food. Find it and they will be more willing to be tamed.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Be patient, taming magical creatures takes time and you have to gain their trust.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Need help with the side quest 'The Lost Artifacts'",
            post_content: "I can't seem to complete 'The Lost Artifacts' side quest. Any advice?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "The last artifact is located in the Forgotten Dungeon. You'll need a torch to see in the dark.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "You have to defeat the stone golem to get the last artifact. Use fire spells, they're its weakness.",
                    likes: 0,
                },
            ],
        },
    ],
    "Reviews-and-Opinions": [
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Loved this game! Would recommend!",
            post_content: "The gameplay is super engaging and the story is out of this world! Totally worth it.",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I totally agree, this game rocks!",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I don't know, there are a lot of glitches...",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Fantastic Soundtrack!",
            post_content: "I was amazed by the music in this game. It really elevates the whole experience!",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "The music was a highlight for me too!",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I actually found the music pretty distracting. Wish there was an option to turn it off.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Storyline is out of this world!",
            post_content: "I've never been so immersed in a game's story before, absolutely brilliant writing!",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Right? The plot twists had me on the edge of my seat!",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "It's too convoluted for my taste, but the gameplay made up for it.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Graphics are just stunning!",
            post_content: "This game has some of the best graphics I've seen in a while. The attention to detail is amazing.",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I was awestruck by the visuals too. It's like a piece of art!",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "The game really did look good, but it took up way too much space on my hard drive.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Controls are a bit clunky",
            post_content: "The game is good, but the controls could be a lot smoother. Took me a while to get used to them.",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Agreed, but once you get the hang of it, it's not so bad.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Controls were a deal breaker for me. Ended up uninstalling the game.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Fun but a bit too short",
            post_content: "Finished the game in just a few hours. Wish there was more content.",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I think the length was perfect. Didn't overstay its welcome.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Felt the same. Luckily, the developers are planning to release more content soon!",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Multiplayer mode is super fun!",
            post_content: "Had a blast playing with my friends. The cooperative missions are so good.",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Yeah, multiplayer is where this game really shines. Solo mode isn't as exciting.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Wish I could say the same. My internet connection kept lagging, so I couldn't enjoy multiplayer much.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Too many microtransactions",
            post_content: "I enjoyed the game, but felt pressured to buy extra content. Not a fan of this model.",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I share the sentiment. Microtransactions are killing the joy of gaming.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I didn't mind the extra purchases. They were optional and added a lot to the gameplay for me.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Surprisingly good character development",
            post_content: "Each character felt real and relatable. Very well done!",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Definitely, the character arcs were my favorite part of the game!",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I found the characters pretty clichéd, but I guess it's a matter of personal taste.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Good game but could use more updates",
            post_content: "The game is enjoyable, but there are bugs that need fixing and updates are few and far between.",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I hope the developers take note. The potential is there, but the bugs are quite annoying.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "The last update did fix a lot of issues for me. Let's hope the next one is around the corner.",
                    likes: 0,
                },
            ],
        },
    ],
    "Bugs-and-Glitches": [
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Stuck in an endless loading screen",
            post_content: "Anyone else experiencing this? I can't seem to get past the loading screen.",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Yes, I had the same issue. Try updating your game, it worked for me.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Didn't face this issue. Maybe it's your hardware?",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Game crashes after reaching level 3",
            post_content: "Is it just me or does the game crash for everyone after reaching level 3?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Happened to me too. Still waiting for the developers to fix this bug.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "My game's running fine. You might want to try reinstalling the game.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Controller not responding in multiplayer mode",
            post_content: "Does anyone else's controller stop responding in multiplayer mode?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I've noticed this issue too. Hope they resolve it soon.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Mine works fine. Maybe it's a problem with your controller?",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Audio glitches in the final mission",
            post_content: "The audio cuts out during the final mission. Anybody else experiencing this?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Had the same issue. Really ruins the immersion.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Hmm, I didn't encounter this problem. Maybe it's your sound card?",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Graphics rendering issue",
            post_content: "The graphics don't render properly in the cave section. The textures are all messed up.",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Same here. Hope they fix it in the next update.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "That's strange, I didn't notice any such issue.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Unresponsive menu",
            post_content: "Is anyone else's game menu not responsive? I can't select any options.",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I faced this issue too. Restarting the game seemed to fix it for me.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "My menu works fine. Try checking if your game is updated.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Game freezes during cutscenes",
            post_content: "My game keeps freezing during the cutscenes. Anyone knows how to fix this?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I lowered my settings and it seemed to work. Try that.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "No freezing here. It might be your graphics card.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Can't access DLC",
            post_content: "I purchased the DLC but can't seem to access it. Anyone else facing this?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "You have to manually download it from the store. Had the same issue.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "That's odd. I could access the DLC right after purchase.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "NPCs not interacting",
            post_content: "None of the NPCs interact in my game. Is this a bug?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I think it's a known bug. They said they're working on it.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "My NPCs are interacting fine. Maybe try reinstalling the game.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Missing quest items",
            post_content: "I'm missing some quest items that I'm sure I collected. Anyone else have this issue?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Same issue here. Makes it impossible to progress in the game.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "All my quest items are there. Are you sure you collected them?",
                    likes: 0,
                },
            ],
        },
    ],
    "Updates-Patches-DLCs": [
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "New update causing crashes",
            post_content: "Ever since the latest update, my game keeps crashing. Is anyone else experiencing this?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Yes, I'm facing the same problem. The devs need to fix this ASAP.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I haven't encountered this issue. Maybe it's a device-specific problem.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Latest Patch Improvements",
            post_content: "I think the latest patch has really improved the gameplay. What do you guys think?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Agreed. The new mechanics are really good.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I actually preferred the old mechanics. This patch has ruined the game for me.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "DLC not showing up",
            post_content: "I bought the new DLC but it's not showing up in my game. Anyone else having this issue?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Try restarting your game or device. That worked for me.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I haven't had this problem. It showed up right away for me.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Rumors about the next update",
            post_content: "I heard that the next update is going to include a new map. Thoughts?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I hope so! The game could really use some new content.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I'd rather they focus on fixing bugs than adding new content.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "New patch is awesome!",
            post_content: "Really loving the changes in the new patch. The game is so much more balanced now.",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Totally agree! It's much more fun to play now.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Really? I think they've overpowered some characters with the new patch.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Can't download new patch",
            post_content: "Is anyone else having trouble downloading the new patch?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Yes, it's taking forever for me too.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I didn't have any issues. Maybe check your internet connection?",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Thoughts on the new DLC",
            post_content: "I'm thinking of buying the new DLC. Is it worth it?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I really enjoyed it. Adds a lot of new content to the game.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "In my opinion, it's not worth the price. Wait for a sale.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "New update changed controls",
            post_content: "The new update changed the controls and I'm not a fan. Anyone else?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Same here. The old controls were better.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I actually like the new controls. It's just a matter of getting used to them.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Update removed features",
            post_content: "The latest update removed some of my favorite features. Not happy with the changes.",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I noticed that too. Hope they bring those features back.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I didn't use those features much, so it doesn't affect me. But I can see why you're upset.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "DLC characters overpowered",
            post_content: "Is it just me or are the new DLC characters overpowered?",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I noticed that too. It's unfair to those who didn't buy the DLC.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I think they're fine. They have their strengths and weaknesses like any other character.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Excited for the upcoming update",
            post_content: "The upcoming update looks really promising. Can't wait!",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Same here! I'm especially excited for the new game modes.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I'm cautiously optimistic. The last update didn't live up to my expectations.",
                    likes: 0,
                },
            ],
        },
    ],
    Meetups: [
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Daily Gaming Sessions",
            post_content: "Join our Discord server at discord.gg/highy-scorers. We play every day at 6 PM CST!",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I joined your session last week. Looking forward to playing with you guys again!",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Heard a lot about your gaming sessions. Excited to join!",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Weekend Co-op Matches",
            post_content: "We're organizing co-op matches every weekend. Join us on discord.gg/crush-them-all for some fun!",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Sounds fun! I'll definitely be there.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I love co-op games. Can't wait to join!",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Tournament Coming Up",
            post_content: "We're hosting a tournament next week. Sign up at discord.gg/troublesome-tournaments. All skill levels welcome!",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I'm not very good, but I'll give it a shot. See you there!",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Tournament sounds exciting. I'm in!",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "New to the Game, Looking for Teammates",
            post_content: "I'm new to the game and could use some help. Anyone want to team up? Join me on discord.gg/squad-matchup.",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I'd be happy to help you out. I'll join your Discord.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "We were all newbies once. I'll join you and share some tips.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Hosting a Charity Stream",
            post_content: "Hosting a charity stream this Friday on my Twitch channel. Join us on discord.gg/twitch-96 for more details.",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "That's a great initiative. I'll definitely tune in.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Looking forward to it! I'll share this with my friends.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Practice Session Tonight",
            post_content: "Hosting a practice session tonight at 7 PM PST. Everyone is welcome. Join us at discord.gg/we-talkin-bout-practice.",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Count me in. I could use some practice.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I'll be there! Let's improve together.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Looking for Raid Team",
            post_content: "Looking for a team to join for raids. Anyone interested can join my Discord at discord.gg/raid-you-not-me.",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I'm interested! I've been looking for a raid team.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Let's do this. I'll join your Discord.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Weekly PvP Matches",
            post_content: "Organizing weekly PvP matches. All skill levels welcome. Join our Discord at discord.gg/one-for-all for details.",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Sounds like fun! I'm in.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I've been looking for some PvP action. Count me in!",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Gaming Marathon This Weekend",
            post_content: "Hosting a gaming marathon this weekend. Join us for some fun at discord.gg/25-miles-of-inputs.",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "I'm always up for a gaming marathon. I'll be there.",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Sounds like a blast! Can't wait to join.",
                    likes: 0,
                },
            ],
        },
        {
            user: {
                username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
            },
            post_title: "Strategy Discussion Meetup",
            post_content: "Let's meet up on discord.gg/discuss-this to discuss strategies and tips. All are welcome!",
            likes: 0,
            comments: [
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Sounds like a great idea. Count me in!",
                    likes: 0,
                },
                {
                    user: {
                        username: mockUsers[Math.floor(Math.random() * mockUsers.length)],
                    },
                    comment_content: "Looking forward to sharing strategies and learning from others.",
                    likes: 0,
                },
            ],
        },
    ],
};

const StrategyAndTipsMock = ({ gameId, categoryPage }) => {
    const [randomPosts, setRandomPosts] = useState([]);
    const [user] = useContext(UserContext);
    const [newComment, setNewComment] = useState([]);

    const [isLiked, setIsLiked] = useState(new Array(mockPosts.length).fill(false));
    const [isCommentLiked, setIsCommentLiked] = useState([]);

    // For the mock data, we store everything in local storage instead of a database
    const handleAddComment = (postIndex, commentContent) => {
        const newPosts = randomPosts.map((post, index) => {
            if (index !== postIndex) return post;
            return {
                ...post,
                comments: [
                    ...post.comments,
                    {
                        user: {
                            username: user.username,
                            profileImage: user.profileImage,
                        },
                        comment_content: commentContent,
                        likes: 0,
                    },
                ],
            };
        });

        setRandomPosts(newPosts);

        localStorage.setItem(`${gameId}_${categoryPage}`, JSON.stringify(newPosts));
    };

    useEffect(() => {
        const storageKey = `${gameId}_${categoryPage}`;

        const postLikedKey = `${gameId}_${categoryPage}_postLiked`;
        const commentLikedKey = `${gameId}_${categoryPage}_commentLiked`;

        const storedData = localStorage.getItem(storageKey);

        let categorizedPosts = mockPosts[categoryPage];

        if (storedData) {
            setRandomPosts(JSON.parse(storedData));
        } else {
            let randomizedPosts = categorizedPosts.map((post) => {
                let postUserIndex = Math.floor(Math.random() * mockUsers.length);
                post.user = mockUsers[postUserIndex];
                post.likes = Math.floor(Math.random() * 10) + 1;

                let commentUsers = [...mockUsers];
                commentUsers.splice(postUserIndex, 1);

                let firstCommentUserIndex = Math.floor(Math.random() * commentUsers.length);
                post.comments[0].user = commentUsers[firstCommentUserIndex];
                post.comments[0].likes = Math.floor(Math.random() * 10) + 1;

                commentUsers.splice(firstCommentUserIndex, 1);
                let secondCommentUserIndex = Math.floor(Math.random() * commentUsers.length);
                post.comments[1].user = commentUsers[secondCommentUserIndex];
                post.comments[1].likes = Math.floor(Math.random() * 10) + 1;

                return post;
            });

            let twoRandomPosts = [];
            while (twoRandomPosts.length < 2) {
                let randomIndex = Math.floor(Math.random() * randomizedPosts.length);
                if (!twoRandomPosts.includes(randomizedPosts[randomIndex])) {
                    twoRandomPosts.push(randomizedPosts[randomIndex]);
                }
            }

            localStorage.setItem(storageKey, JSON.stringify(twoRandomPosts));

            setRandomPosts(twoRandomPosts);
        }

        const storedIsLiked = localStorage.getItem(postLikedKey);
        setIsLiked(storedIsLiked ? JSON.parse(storedIsLiked) : []);

        const storedIsCommentLiked = localStorage.getItem(commentLikedKey);
        setIsCommentLiked(storedIsCommentLiked ? JSON.parse(storedIsCommentLiked) : []);
    }, [gameId, categoryPage]);

    const [openIndex, setOpenIndex] = useState(null);

    const handleLike = (type, postIndex, commentIndex) => {
        setRandomPosts((prevPosts) =>
            prevPosts.map((post, i) => {
                if (i !== postIndex) return post;

                if (type === "post") {
                    const newIsLiked = !isLiked[postIndex];

                    setIsLiked((prevLiked) => {
                        const newLiked = [...prevLiked];
                        newLiked[postIndex] = newIsLiked;
                        return newLiked;
                    });

                    const updatedPost = {
                        ...post,
                        likes: newIsLiked ? post.likes + 1 : post.likes - 1,
                    };

                    localStorage.setItem(`${gameId}_${categoryPage}`, JSON.stringify(prevPosts.map((p, idx) => (idx === postIndex ? updatedPost : p))));
                    localStorage.setItem(`${gameId}_${categoryPage}_postLiked`, JSON.stringify(isLiked.map((liked, idx) => (idx === postIndex ? newIsLiked : liked))));

                    return updatedPost;
                } else if (type === "comment") {
                    const newIsCommentLiked = !((isCommentLiked[postIndex] || [])[commentIndex] || false);

                    setIsCommentLiked((prevLiked) => {
                        const newLiked = JSON.parse(JSON.stringify(prevLiked));
                        if (!newLiked[postIndex]) newLiked[postIndex] = [];
                        newLiked[postIndex][commentIndex] = newIsCommentLiked;
                        return newLiked;
                    });

                    const updatedPost = { ...post };
                    updatedPost.comments = updatedPost.comments.map((comment, j) => {
                        if (j !== commentIndex) return comment;

                        return {
                            ...comment,
                            likes: newIsCommentLiked ? comment.likes + 1 : comment.likes - 1,
                        };
                    });

                    localStorage.setItem(`${gameId}_${categoryPage}`, JSON.stringify(prevPosts.map((p, idx) => (idx === postIndex ? updatedPost : p))));
                    localStorage.setItem(`${gameId}_${categoryPage}_commentLiked`, JSON.stringify(isCommentLiked.map((likedPost, idx) => (idx === postIndex ? likedPost.map((liked, idx) => (idx === commentIndex ? newIsCommentLiked : liked)) : likedPost))));

                    return updatedPost;
                }

                return post;
            })
        );
    };

    const handleToggle = (index) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    return (
        <>
            {Array.isArray(randomPosts) &&
                randomPosts.map((post, index) => {
                    return (
                        <section key={index} className="post-mapping-section-container">
                            <section className="post-mapping-image-section">
                                <img src={post.user.profileImage} alt={post.user.username} aria-label={post.user.username} />
                                <div className="post-text-section" style={{ marginLeft: "1rem" }}>
                                    <h2>{post.post_title}</h2>
                                    <p>{post.post_content}</p>
                                    <h5>{post.user.username}</h5>
                                </div>
                            </section>

                            <section className="like-button-section">
                                <button className="post-comment-like-button" style={{ width: "4rem" }} onClick={() => handleLike("post", index)} aria-pressed={isLiked[index] ? "true" : "false"} aria-label="like button for post">
                                    {isLiked[index] ? "Unlike" : "Like"}sw
                                </button>
                                <p style={{color:'white'}}>{post.likes} likes </p>
                            </section>

                            <div onClick={() => handleToggle(index)} className={`accordion-container ${openIndex === index ? "open" : "closed"}`}>
                                Comments {openIndex === index ? "▲" : "▼"}
                            </div>

                            {openIndex === index && (
                                <section className="accordion-comment-section-container">
                                    {/* Comment section */}
                                    {post.comments &&
                                        post.comments.length > 0 &&
                                        post.comments.map((comment, idx) => (
                                            <section className="accordion-comment-section" key={idx} dby={comment.user.username}>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <img src={comment.user.profileImage} alt={comment.user.username} aria-label={comment.user.username} />
                                                    <div className="comment-text-section">
                                                        <p>{comment.comment_content}</p>
                                                        <h5>{comment.user.username}</h5>
                                                    </div>
                                                </div>
                                                <section className="accordion-comment-like-section">
                                                    <button
                                                        className="post-comment-like-button"
                                                        style={{
                                                            width: "4rem",
                                                        }}
                                                        onClick={() => handleLike("comment", index, idx)}
                                                        aria-pressed={isLiked[index] ? "true" : "false"}
                                                        aria-label="like button for post"
                                                    >
                                                        {(isCommentLiked[index] || [])[idx] || false ? "Unlike" : "Like"}
                                                    </button>
                                                    <p style={{color:'white'}}>{comment.likes} likes</p>
                                                </section>
                                            </section>
                                        ))}
                                    {/* Add a new comment to the post  */}
                                    <div className="add-a-new-comment">
                                        <textarea
                                            value={newComment[index] || ""}
                                            onChange={(event) => {
                                                setNewComment((prevComments) => {
                                                    const newComments = [...prevComments];
                                                    newComments[index] = event.target.value;
                                                    return newComments;
                                                });
                                            }}
                                            placeholder="Add a comment..."
                                            aria-label="Add a comment"
                                        />
                                        <button
                                            className="add-comment-button"
                                            style={{ width: "10rem", marginTop: ".5rem" }}
                                            onClick={() => {
                                                handleAddComment(index, newComment[index]);
                                                setNewComment((prevComments) => {
                                                    const newComments = [...prevComments];
                                                    newComments[index] = "";
                                                    return newComments;
                                                });
                                            }}
                                            aria-label="Add Comment"
                                        >
                                            Add Comment
                                        </button>
                                    </div>
                                </section>
                            )}
                        </section>
                    );
                })}
        </>
    );
};

export default StrategyAndTipsMock;
