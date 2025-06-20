import EmojiPicker from '@/components/EmojiPicker'
import {$playlists, DeletePlaylistByName} from '@/store/store'
import { useStore } from '@nanostores/react'
import { CheckIcon } from '@radix-ui/react-icons'
import { useState} from "react"

import {
    Button,
    Flex,
    Select,
    Slider,
    Text,
    TextArea,
    TextField,
    DataList,
    Badge,
    IconButton,
    Code,
    Box,
    Table,
    Tabs,
} from '@radix-ui/themes'
import playlist from "@/pages/Playlist.jsx";

const PlaylistTabs = () => {

    const [activeTab, setActiveTab] = useState("tab1");


    return (
        <Flex height="fit-content" flexDirection="column" p="4" width="100%">
            <Table.Root value={activeTab} style={{ width: "100%" }}>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Titre</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Artiste</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>

                    {SongFromFirstPlaylist.map((msg) => (
                        <Table.Row>
                            <Table.RowHeaderCell>{msg.title}</Table.RowHeaderCell>
                            <Table.Cell>{msg.artist}</Table.Cell>
                        </Table.Row>
                    ))}

                </Table.Body>
            </Table.Root>

            <p>Current tab: {activeTab}</p>

        </Flex>
    )

}

export default PlaylistTabs


const UpdatePlaylist = [
    UpdateFirstPlaylist,
    ...DeletePlaylistByName(name),
];

const SortUpdatePlaylist = [
    UpdatePlaylist.sort((a, b) => a.id - b.id),
];

$playlists.set([...SortUpdatePlaylist]);