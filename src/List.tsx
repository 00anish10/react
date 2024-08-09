import React, { useState } from "react";

const FriendsList: React.FC = () => {
    const [friends, setFriends] = useState<{ name: string; contact: string }[]>([]);
    const [friend, setFriend] = useState<{ name: string; contact: string }>({
        name: "",
        contact: "",
    });

    const addFriend = (): void => {
        if (friend.name.trim() !== "" && friend.contact.trim() !== "") {
            const nameExists = friends.some(f => f.name.toLowerCase() === friend.name.toLowerCase());
            const contactExists = friends.some(f => f.contact.toLowerCase() === friend.contact.toLowerCase());

            if (nameExists && contactExists) {
                alert("This friend (name and contact) is already in the list!");
            } else if (nameExists) {
                alert("This friend (name) is already in the list!");
            } else if (contactExists) {
                alert("This friend (contact) is already in the list!");
            } else {
                setFriends(prev => [...prev, { name: friend.name.trim(), contact: friend.contact.trim() }]);
                setFriend({ name: "", contact: "" });
            }
        }
    };

    const deleteFriend = (index: number): void => {
        setFriends(prev => {
            const updatedFriends = [...prev];
            updatedFriends.splice(index, 1);
            return updatedFriends;
        });
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Enter") {
            addFriend();
        }
    };

    return (
        <>
            <div className="flex space-x-2">
                <input
                    type="text"
                    placeholder="Name"
                    value={friend.name}
                    onChange={(e) => setFriend({ ...friend, name: e.target.value })}
                    onKeyPress={handleKeyPress}
                    className="border-2 border-emerald-700 outline-none focus:outline-none focus:ring-0 py-1.5 px-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Contact"
                    value={friend.contact}
                    onChange={(e) => setFriend({ ...friend, contact: e.target.value })}
                    onKeyPress={handleKeyPress}
                    className="border-2 border-emerald-700 outline-none focus:outline-none focus:ring-0 py-1.5 px-2 rounded-lg"
                />
                <button
                    onClick={addFriend}
                    className="bg-emerald-700 text-white px-3 rounded-lg"
                >
                    Add Friend
                </button>
            </div>
            <h1 className="mt-2 text-sm">Friends List</h1>
            <ul className="mt-1 w-[320px] flex flex-col space-y-1">
                {friends.map((item, index) => (
                    <li
                        key={index}
                        className="py-1.5 px-2 flex items-center justify-between border rounded-lg bg-gray-100"
                    >
                        <div>
                            <span>Name: {item.name}</span>
                            <br />
                            <span>Contact: {item.contact}</span>
                        </div>
                        <button
                            className="text-xs bg-red-700 text-white py-1 px-2 rounded-full"
                            onClick={() => deleteFriend(index)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default FriendsList;
