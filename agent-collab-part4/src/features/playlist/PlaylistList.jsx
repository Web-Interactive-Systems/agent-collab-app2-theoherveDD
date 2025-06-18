import EmojiPicker from '@/components/EmojiPicker'
import { $playlists } from '@/store/store'
import { useStore } from '@nanostores/react'
import { CheckIcon } from '@radix-ui/react-icons'
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
} from '@radix-ui/themes'
import playlist from "@/pages/Playlist.jsx";

const PlaylistList = () => {
    const playlist = useStore($playlists);

    const SongFromFirstPlaylist = playlist[0]["songs"];

    return (
        <Flex height="fit-content" flexDirection="column" p="4" width="100%">
            <Table.Root style={{ width: "100%" }}>
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

        </Flex>
    )

}

export default PlaylistList