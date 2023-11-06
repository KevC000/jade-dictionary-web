import React from "react";

import {
  ActionIcon,
  HoverCard,
  TextInput,
  Text,
  rem,
  List,
} from "@mantine/core";
import {
  Spotlight,
  SpotlightAction,
  SpotlightActionData,
  spotlight,
} from "@mantine/spotlight";
import { IconArrowRight, IconHome, IconSearch } from "@tabler/icons-react";

import classes from "./SearchBar.module.css";

type Props = {
  width?: number;
};

const SearchBar = (props: Props) => {
  const actions: SpotlightActionData[] = [];

  return (
    <>
      <div className="flex-1 max-w-[20rem] w-full">
        <HoverCard width={280} shadow="md">
          <HoverCard.Target>
            <TextInput
              radius="xl"
              placeholder="Search..."
              rightSectionWidth={42}
              leftSection={
                <IconSearch
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              }
              rightSection={
                <ActionIcon
                  className={classes.icon}
                  onClick={spotlight.open}
                  size="md"
                  radius="xl"
                  variant="filled"
                  aria-label="Search"
                >
                  <IconArrowRight
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                    color="white"
                  />
                </ActionIcon>
              }
            />
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="md" fw={700}>
              Search Dictionary
            </Text>
            <List type="unordered" listStyleType="disc" size="sm">
              <List.Item>
                <Text size="sm">
                  Press&nbsp;
                  <strong>Ctrl+K</strong>&nbsp; for quick access
                </Text>
              </List.Item>
              <List.Item>
                <Text size="sm">Example Inputs:</Text>
                <Text size="xs">
                  <strong>比如</strong> | <strong>Example</strong> |{" "}
                  <strong>bǐrú</strong> | <strong>bi3ru2</strong> |{" "}
                  <strong>biru</strong>
                </Text>
              </List.Item>
            </List>
          </HoverCard.Dropdown>
        </HoverCard>
      </div>

      <Spotlight.Root
        query={""}
        onSpotlightOpen={() => {}}
        onQueryChange={() => {}}
        closeOnClickOutside
        closeOnEscape
        scrollable
      >
        <Spotlight.Search
          placeholder="Search via English, Pinyin, or Chinese..."
          rightSection={<IconSearch stroke={1.5} />}
        />

        <Spotlight.ActionsList>
          <SpotlightAction label="lol" highlightQuery></SpotlightAction>
          <Spotlight.Empty>Nothing found...</Spotlight.Empty>
        </Spotlight.ActionsList>
      </Spotlight.Root>
    </>
  );
};

export default SearchBar;
