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
    Tabs,
} from '@radix-ui/themes'
import playlist from "@/pages/Playlist.jsx";


const PlaylistList = ({ activeTab, setActiveTab }) => {
    const playlist = useStore($playlists);

    const SongFromFirstPlaylist = playlist[0]["songs"];

    return (

        <Tabs.Root value={activeTab} onValueChange={setActiveTab} defaultValue="account" style={{ width: "100%" }}>
            <Tabs.List>
                {playlist.map((playlist) => (
                    <Tabs.Trigger value={playlist.name}>{playlist.name}</Tabs.Trigger>
                ))}
            </Tabs.List>

            <Box pt="3">
                {playlist.map((play) => (
                <Tabs.Content value={play.name}>

                    <Flex height="fit-content" flexDirection="column" p="4" width="100%">
                        <Table.Root style={{ width: "100%" }}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Titre</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Artiste</Table.ColumnHeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {play["songs"].map((song) => (
                                    <Table.Row>
                                        <Table.Cell><Button>▶︎</Button></Table.Cell>
                                        <Table.RowHeaderCell>{song.title}</Table.RowHeaderCell>
                                        <Table.Cell>{song.artist}</Table.Cell>
                                    </Table.Row>

                                ))}

                            </Table.Body>
                        </Table.Root>

                    </Flex>

                </Tabs.Content>
                ))}
            </Box>

        </Tabs.Root>



    )

}

export default PlaylistList